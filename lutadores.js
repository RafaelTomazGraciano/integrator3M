import { decryptResponse } from './auth.js'

const array = ["https://lutadores-api-22f61a69f511.herokuapp.com/lutadores", "https://api-lutadoressd.onrender.com/api/lutadores"]

export async function getLutadores(app){
    app.get("/lutadores", async (req, res) => {
		const first = Math.random() > 0.5
		let str = null
		if (first) {
			str = await fetch(array[0])
            str = await decryptResponse(str)
		}
        else{
            str = await fetch(array[1])
        }
		const json = await str.json()
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

export async function getLutadoresById(app){
	app.get("/lutadores/:id", async (req, res) => {
		const first = Math.random() > 0.5
		let str = null
		if (first) {
			str = await fetch(`${array[0]}/${req.params.id}`)
			str = await decryptResponse(str)
		}
        else{
            str = await fetch(`${array[1]}/${req.params.id}`)
        }
		const json = await str.json()
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

export async function createLutadores(app){
	app.post("/lutadores", async (req, res) => {
		const body = JSON.stringify(req.body)
		const { nome, apelido, categoria, arte } = req.body;
		
		const request1 = fetch(`array[0]?nome=${nome}&apelido=${apelido}&categoria=${categoria}&arte=${arte}`, {
			method: "POST"
		})

		const request2 = fetch(array[1], {
			method: "POST",
			body: JSON.stringify(req.body)
		})
		await Promise.all([request1, request2])
		res.send({body})
	})
}

export async function updateLutadores(app){
	app.put("/lutadores/:id", async (req, res) => {
		const id = req.params.id
		const body = JSON.stringify(req.body)
		const { nome, apelido, categoria, arte } = req.body;

		const request1 = fetch(`${array[0]}/${id}?nome=${nome}&apelido=${apelido}&categoria=${categoria}&arte=${arte}`,{
			method: "PUT"
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: body
		})
		await Promise.all([request1, request2])
		res.send({msg: "Atualizado"})
	})
}

export async function deleteLutadores(app){
    app.delete("/lutadores/:id", async (req, res) => {
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`,{
			method: "DELETE"
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "DELETE"
		})
		await Promise.all([request1, request2])
		res.send({msg: "Deletado"})
	})
}