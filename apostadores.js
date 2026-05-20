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
		const body = req.body

		const valorPix = req.body.chavePix || req.body.chave_pix;
        const baseBody = { ...req.body };
        delete baseBody.chavePix;
        delete baseBody.chave_pix;
        const bodyApi0 = { ...baseBody, chavePix: valorPix };
        const bodyApi1 = { ...baseBody, chave_pix: valorPix };

		const request1 = fetch(array[0], {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${await authRuan()}`
			},
			body: JSON.stringify(bodyApi0),
		})
		const request2 = fetch(array[1], {
			method: "POST",
			headers:{
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyApi1)
		})
		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function updateApostadores(app) {
	app.put("/apostadores/:id", async (req, res) => {
		const id = req.params.id
		const body = req.body

		const valorPix = req.body.chavePix || req.body.chave_pix;
        const baseBody = { ...req.body };
        delete baseBody.chavePix;
        delete baseBody.chave_pix;
        const bodyApi0 = { ...baseBody, chavePix: valorPix };
        const bodyApi1 = { ...baseBody, chave_pix: valorPix };

		const request1 = fetch(`${array[0]}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${await authRuan()}`
            },
			body: JSON.stringify(bodyApi0)
		})
		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyApi1),
		})
		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function deleteApostadores(app) {
	app.delete("/apostadores/:id", async (req, res) => {
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "DELETE",
			headers: {
                Authorization: `Bearer ${await authRuan()}`
            },
		})
		const request2 = fetch(`${array[1]}/${id}`, {
			method: "DELETE",
		})
		await Promise.all([request1, request2])
		res.send({msg: "Deletado"})
	})
}