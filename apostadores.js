import { authRuan } from './auth.js'

const array = ["https://api-apostadores-fight-azure.vercel.app/apostadores", "https://api-sd-df8o.onrender.com/apostadores"]


/* 
Array0
{
    "nome": "Ricardo",
    "idade": 50,
    "chavePix": "123456789"
}

Array1
{
    "nome": "Ricardo",
    "idade": 50,
    "chave_pix": "123456789"
}
*/

export async function getApostadores(app) {
    app.get("/apostadores", async (req, res) => {
        const first = Math.random() > 0.5
        try {
            let str
            if (first) {
                str = await fetch(array[0], {
                    method: "GET",
                    headers: { Authorization: `Bearer ${await authRuan()}` }
                })
            } else {
                str = await fetch(array[1])
            }
            const json = await str.json()
            return res.send(json)
        } catch (err) {
            try {
                let str
                if (!first) {
                    str = await fetch(array[0], {
                        method: "GET",
                        headers: { Authorization: `Bearer ${await authRuan()}` }
                    })
                } else {
                    str = await fetch(array[1])
                }
                const json = await str.json()
                return res.send(json)
            } catch (err2) {
                return res.status(500).send({ error: err2.message })
            }
        }
    })
}

export async function getApostadoresById(app) {
	app.get("/apostadores/:id", async (req, res) => {
        const id = req.params.id
		const str = await fetch(`${array[0]}/${id}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await authRuan()}`
				}
			})
		const json = await str.json()
		res.send(json)
	})
}

export async function createApostadores(app) {
	app.post("/apostadores", async (req, res) => {
		const valorPix = req.body.chavePix || req.body.chave_pix;
        const baseBody = { ...req.body };
        delete baseBody.chavePix;
        delete baseBody.chave_pix;
        const bodyApi0 = { ...baseBody, chavePix: valorPix };
        const bodyApi1 = { ...baseBody, chave_pix: valorPix };
 
		const [res1, res2] = await Promise.allSettled([
			fetch(array[0], {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${await authRuan()}`
				},
				body: JSON.stringify(bodyApi0),
			}),
			fetch(array[1], {
				method: "POST",
				headers:{
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyApi1)
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


export async function updateApostadores(app) {
	app.put("/apostadores/:id", async (req, res) => {
		const id = req.params.id

		const valorPix = req.body.chavePix || req.body.chave_pix;
        const baseBody = { ...req.body };
        delete baseBody.chavePix;
        delete baseBody.chave_pix;
        const bodyApi0 = { ...baseBody, chavePix: valorPix };
        const bodyApi1 = { ...baseBody, chave_pix: valorPix };

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${await authRuan()}`
				},
				body: JSON.stringify(bodyApi0)
			}),

			fetch(`${array[1]}/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bodyApi1),
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

export async function deleteApostadores(app) {
	app.delete("/apostadores/:id", async (req, res) => {
		const id = req.params.id

		const [res1, res2] = await Promise.allSettled([
			fetch(`${array[0]}/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${await authRuan()}` },
			}),

			fetch(`${array[1]}/${id}`, {
				method: "DELETE",
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
