import { authChina, authDuduzao } from './auth.js'

const array = ["https://api-aposta-lutas.vercel.app/apostas", "http://187.77.235.119:5555/apostas"]

function convertToChina(data) {
	return {
		"idApostador": data.id_apostador,
		"valor": data.valor,
		"idLuta": data.id_luta,
		"idLutador1": data.id_lutador,
		"idLutador2": null,
	}
}

function convertToCommon(data) {
	
	if (Array.isArray(data)) {
		if("id_lutador" in data[0]) return data
		const newArray = new Array(data.length)
		console.log(data)
		for (let i = 0; i < data.length; i++) {
			newArray[i] = {
				"valor": data[i].valor,
				"id_apostador": data[i].idApostador,
				"id_luta": data[i].idLuta,
				"id_lutador": data[i].idLutador1,
				"id": data[i].id
			}
		}
		return newArray
	}

	if ("id_lutador" in data) return data;

	return {
		"valor": data.valor,
		"id_apostador": data.idApostador,
		"id_luta": data.idLuta,
		"id_lutador": data.idLutador1,
		"id": data.id
	};
}

export async function getApostas(app) {
	app.get("/apostas", async (req, res) => {
		const first = Math.random() > 0.5
		try {
			let str
			if (first) {
				str = await fetch(array[0], {
					method: "GET",
					headers: { 
						Authorization: `Bearer ${await authDuduzao()}`,
						"Content-Type": "application/json"
					}
				})
			} else {
				str = await fetch(array[1], {
					method: "GET",
					headers: {
						"X-Encrypted": 'true',
						"Content-Type": "application/json"
					}
				})
			}
			const json = convertToCommon(await str.json())
			return res.send(json)
		} catch (err) {
			try {
				let str
				if (!first) {
					str = await fetch(array[0], {
						method: "GET",
						headers: {
							Authorization: `Bearer ${await authDuduzao()}`,
							"Content-Type": "application/json"
						}
					})
				} else {
					str = await fetch(array[1], {
						method: "GET",
						headers: { "X-Encrypted": 'true' }
					})
				}
				const json = convertToCommon(await str.json())
				return res.send(json)
			} catch (err2) {
				return res.status(500).send({ error: err2.message })
			}
		}
	})
}

export async function getApostasById(app) {
	app.get("/apostas/:id", async (req, res) => {
		const id = req.params.id
		try {
			const str = await fetch(`${array[0]}/${id}`, {
				method: "GET",
				headers: { Authorization: `Bearer ${await authDuduzao()}` }
			})
			const json = convertToCommon(await str.json())
			return res.send(json)
		} catch (err) {
			return res.status(500).send({ error: err.message })
		}
	})
}

export async function createApostas(app) {
	app.post("/apostas", async (req, res) => {
		const chinaJson = convertToChina(req.body)
 
		const [res1, res2] = await Promise.allSettled([
			fetch(array[0], {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await authDuduzao()}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(req.body)
			}),
			fetch(array[1], {
				method: "POST",
				headers: {
					"X-Encrypted": "true",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(authChina(chinaJson))
			})
		])
 
		const status1 = res1.status === "fulfilled" ? res1.value.status : null
		const status2 = res2.status === "fulfilled" ? res2.value.status : null
		const ok1 = status1 >= 200 && status1 < 300
		const ok2 = status2 >= 200 && status2 < 300
 
		if (!ok1 && !ok2) return res.status(500).send({ error: "Falha em ambas as APIs" })
 
		return res.send({
			msg: "Processado",
			data: req.body,
			apis: [
				{ api: 0, status: status1, ok: ok1 },
				{ api: 1, status: status2, ok: ok2 }
			]
		})
	})
}

export async function updateApostas(app) {
	app.put("/apostas/:id", async (req, res) => {
		const id = req.params.id
		const body = req.body

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "PUT",
				body: JSON.stringify(body),
				headers: { 
					Authorization: `Bearer ${await authDuduzao()}`,
					"Content-Type": "application/json"
				}
			}),
			fetch(`${array[1]}/${id}`, {
				method: "PUT",
				body: JSON.stringify(authChina({valor: body.valor})),
				headers: { 
					"X-Encrypted": 'true',
					"Content-Type": "application/json"
				 }
			})
		])

		const status1 = res1.status === "fulfilled" ? res1.value.status : null
		const status2 = res2.status === "fulfilled" ? res2.value.status : null
		const ok1 = status1 >= 200 && status1 < 300
		const ok2 = status2 >= 200 && status2 < 300

		if (!ok1 && !ok2) return res.status(404).send({ error: "Não encontrado em nenhuma API" })

		return res.send({
			msg: "Processado",
			data: req.body,
			apis: [
				{ api: 0, status: status1, ok: ok1 },
				{ api: 1, status: status2, ok: ok2 }
			]
		})
	})
}

export async function deleteApostas(app) {
	app.delete("/apostas/:id", async (req, res) => {
		const id = req.params.id

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "DELETE",
				headers: { 
					Authorization: `Bearer ${await authDuduzao()}`,
					"Content-Type": "application/json"
				}
			}),

			fetch(`${array[1]}/${id}`, {
				method: "DELETE",
				headers: {
						"X-Encrypted": 'true',
						"Content-Type": "application/json"
				},
				body: JSON.stringify(authChina({}))
			})
		])

		const status1 = res1.status === "fulfilled" ? res1.value.status : null
		const status2 = res2.status === "fulfilled" ? res2.value.status : null
		const ok1 = status1 >= 200 && status1 < 300
		const ok2 = status2 >= 200 && status2 < 300

		if (!ok1 && !ok2) return res.status(404).send({ error: "Não encontrado em nenhuma API" })

		return res.send({
			msg: "Processado",
			apis: [
				{ api: 0, status: status1, ok: ok1 },
				{ api: 1, status: status2, ok: ok2 }
			]
		})
	})
}
