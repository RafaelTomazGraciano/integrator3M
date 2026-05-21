import { authDuduzao } from './auth.js'

const array = ["https://api-aposta-lutas.vercel.app/apostas", "other"]

export async function getApostas(app) {
    app.get("/apostas", async (req, res) => {
        const first = Math.random() > 0.5
        try {
            let str
            if (first) {
                str = await fetch(array[0], {
                    method: "GET",
                    headers: { Authorization: `Bearer ${await authDuduzao()}` }
                })
            } else {
                str = await fetch(array[1], {
                    method: "GET",
                    headers: { "CRIPTOGRAFIA": null }
                })
            }
            const json = await str.json()
            return res.send(json)
        } catch (err) {
            try {
                let str
                if (!first) {
                    str = await fetch(array[0], {
                        method: "GET",
                        headers: { Authorization: `Bearer ${await authDuduzao()}` }
                    })
                } else {
                    str = await fetch(array[1], {
                        method: "GET",
                        headers: { "CRIPTOGRAFIA": null }
                    })
                }
                const json = await str.json()
                return res.send(json)
            } catch (err2) {
                return res.status(500).send({ error: err2.message })
            }
        }
    })
}

export async function getApostasById(app) {
    app.get("/apostas/:id", async (req, res) => {
        const first = Math.random() > 0.5
        const id = req.params.id
        try {
            let str
            if (first) {
                str = await fetch(`${array[0]}/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${await authDuduzao()}` }
                })
            } else {
                str = await fetch(`${array[1]}/${id}`, {
                    method: "GET",
                    headers: { "CRIPTOGRAFIA": null }
                })
            }
            const json = await str.json()
            return res.send(json)
        } catch (err) {
            try {
                let str
                if (!first) {
                    str = await fetch(`${array[0]}/${id}`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${await authDuduzao()}` }
                    })
                } else {
                    str = await fetch(`${array[1]}/${id}`, {
                        method: "GET",
                        headers: { "CRIPTOGRAFIA": null }
                    })
                }
                const json = await str.json()
                return res.send(json)
            } catch (err2) {
                return res.status(500).send({ error: err2.message })
            }
        }
    })
}

export async function createApostas(app){
    app.post("/apostas", async (req, res) => {
		const body = JSON.stringify(req.body)
		const request1 = fetch(array[0], {
			method: "POST",
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
			},
			body: JSON.stringify(req.body)
		})

		const request2 = fetch(array[1], {
			method: "POST",
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			},
			body: JSON.stringify(req.body)
		})

		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function updateApostas(app) {
    app.put("/apostas/:id", async (req, res) => {
		const id = req.params.id
		const body = JSON.stringify(req.body)

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "PUT",
				body: body,
				headers: { Authorization: `Bearer ${await authDuduzao()}` }
			}),
			fetch(`${array[1]}/${id}`, {
				method: "PUT",
				body: body,
				headers: { "CRIPTOGRAFIA": null }
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

export async function deleteApostas(app){
    app.delete("/apostas/:id", async (req, res) => {
		const id = req.params.id

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${await authDuduzao()}` }
			}),

			fetch(`${array[1]}/${id}`, {
				method: "DELETE",
				headers: { "CRIPTOGRAFIA": null }
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
