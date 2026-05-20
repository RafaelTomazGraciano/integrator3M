import { authRuan } from './auth.js'

const array = ["https://api-apostadores-fight-azure.vercel.app/apostadores", "https://api-sd-df8o.onrender.com/apostadores"]

export async function getApostadores(app) {
	app.get("/apostadores", async (req, res) => {
		let str = null
		const first = Math.random() > 0.5
		if (first) {
			str = await fetch(array[0], {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await authRuan()}`,
				},
			})
		}
		else {
			str = await fetch(array[1])
		}
		const json = await str.json()
		res.send(json)
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
		const request1 = fetch(array[0], {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${await authRuan()}`
			}
		})
		const request2 = fetch(array[1], {
			method: "POST",
			body: JSON.stringify(body)
		})
		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function updateApostadores(app) {
	app.put("/apostadores/:id", async (req, res) => {
		const id = req.params.id
		const body = req.body
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "PUT",
			headers: {
                Authorization: `Bearer ${await authRuan()}`
            },
			body: JSON.stringify(body)
		})
		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: JSON.stringify(body),
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