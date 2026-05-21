import { decryptResponse } from './auth.js'

const array = ["https://lutadores-api-22f61a69f511.herokuapp.com/lutadores", "https://api-lutadoressd.onrender.com/api/lutadores"]

export async function getLutadores(app){
    app.get("/lutadores", async (req, res) => {
        const first = Math.random() > 0.5
        try {
            let str = await fetch(array[first ? 0 : 1])
            if (first) str = await decryptResponse(str)
            return res.send(await str.json())
        } catch (err) {
            try {
                let str = await fetch(array[first ? 1 : 0])
                if (!first) str = await decryptResponse(str) 
                return res.send(await str.json())
            } catch (err2) {
                return res.status(500).send({ error: err2.message })
            }
        }
    })
}

export async function getLutadoresById(app) {
    app.get("/lutadores/:id", async (req, res) => {
        const first = Math.random() > 0.5
        const id = req.params.id
        let str = null
        try {
            if (first) {
                str = await fetch(`${array[0]}/${id}`)
                str = await decryptResponse(str)
            } else {
                str = await fetch(`${array[1]}/${id}`)
            }
            const json = await str.json()
            res.send(json)
        } catch (err) {
            try {
                str = await fetch(`${array[first ? 1 : 0]}/${id}`)
                if (!first) str = await decryptResponse(str)
                const json = await str.json()
                res.send(json)
            } catch (err2) {
                res.status(500).send({ error: err2.message })
            }
        }
    })
}

export async function createLutadores(app){
	app.post("/lutadores", async (req, res) => {
		const body = JSON.stringify(req.body)
		const { nome, apelido, categoria, arte } = req.body;
		
		const request1 = fetch(`${array[0]}?nome="${nome}"&apelido="${apelido}"&categoria="${categoria}"&arte="${arte}"`, {
			method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
		})

		const request2 = fetch(array[1], {
			method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
			body: JSON.stringify(req.body)
		})
		await Promise.all([request1, request2])
		res.send(req.body)
	})
}

export async function updateLutadores(app){
	app.put("/lutadores/:id", async (req, res) => {
		const id = req.params.id
		const body = JSON.stringify(req.body)
		const { nome, apelido, categoria, arte } = req.body;

		const request1 = fetch(`${array[0]}/${id}?nome=${nome}&apelido=${apelido}&categoria=${categoria}&arte=${arte}`,{
			method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
			body: body
		})
		await Promise.all([request1, request2])
		res.send(req.body)
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