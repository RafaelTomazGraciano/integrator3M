import { authDuduzao } from './auth.js'

const array = ["https://api-aposta-lutas.vercel.app/apostas", "other"]

export async function getApostas(app) {
    app.get("/apostas", async (req, res) => {
        let str = null
        const first = Math.random() > 0.5
        if (first) {
            str = await fetch(array[0], {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await authDuduzao()}`
                }
            })
        }
        else{
            str = await fetch(array[1], {
                method: "GET",
                headers: {
                    //TODO
                    "CRIPTOGRAFIA": null,
                }
            })
        }
        const json = await str.json()
        res.send(json)
    })
}

export async function getApostasById(app) {
    app.get("/apostas/:id", async (req, res) => {
        let str = null
        const first = Math.random() > 0.5
        if (first) {
            str = await fetch(`${array[0]}/${req.params.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await authDuduzao()}`
                }
            })
        }
        else{
            str = await fetch(`${array[1]}/${req.params.id}`, {
                method: "GET",
                headers: {
                    //TODO
                    "CRIPTOGRAFIA": null,
                }
            })
        }
        const json = await str.json()
        res.send(json)
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
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "PUT",
			body: body,
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
			}
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: body,
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			}
		})
		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function deleteApostas(app){
    app.delete("/apostas/:id", async (req, res) => {
		const body = JSON.stringify(req.body)
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "DELETE",
			body: body,
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
			}
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "DELETE",
			body: body,
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			}
		})
		await Promise.all([request1, request2])
		res.send({msg: "Deletado"})
	})
}