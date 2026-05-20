

const array = ["https://bet3m-production.up.railway.app/lutas", "littefire.com"]    

export async function getLutas(app) {
    app.get("/lutas", async (req, res) => {
        const first = Math.random() > 0.5
        try {
            let str
            if (first) {
                str = await fetch(array[0], {
                    method: "GET",
                    headers: { "X-API-KEY": "bet3M-UENP" }
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
                        headers: { "X-API-KEY": "bet3M-UENP" }
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
 
export async function getLutasById(app){
    app.get("/lutas/:id", async (req, res) => {
        const first = Math.random() > 0.5
        const id = req.params.id
        try {
            let str
            if (first) {
                str = await fetch(`${array[0]}/${id}`, {
                    method: "GET",
                    headers: { "X-API-KEY": "bet3M-UENP" }
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
                        headers: { "X-API-KEY": "bet3M-UENP" }
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

export async function createLutas(app){
    app.post("/lutas", async (req, res) => {
		const body = JSON.stringify(req.body)
		const request1 = fetch(array[0], {
			method: "POST",
			headers: {
				"X-API-KEY": "bet3M-UENP",
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

export async function updateLutas(app){
    app.put("/lutas/:id", async (req, res) => {
		const body = JSON.stringify(req.body)
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "PUT",
			headers: {
				"X-API-KEY": "bet3M-UENP",
			},
			body: body,
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

export async function deleteLutas(app){
    app.delete("/lutas/:id", async (req, res) => {
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "DELETE",
			headers: {
				"X-API-KEY": "bet3M-UENP",
			}
		})

		const request2 = fetch(`${array[1]}/${id}`, {
			method: "DELETE",
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			}
		})
		await Promise.all([request1, request2])
		res.send({msg: "Deletado"})
	})
}