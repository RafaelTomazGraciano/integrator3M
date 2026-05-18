const express = require('express')

const array = ["https://bet3m-production.up.railway.app/lutas", "littefire.com"]    

async function getLutas(app) {
	app.get("/lutas", (req, res) => {
		const first = Math.random() > 0.5
		let str = null
		if (first) {
			str = await fetch(array[0], {
				method: "GET",
				headers: {
					"X-API-KEY": "bet3M-UENP"
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
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

async function getLutasById(app){
    app.get("/lutas/:id", (req, res) => {
		const first = Math.random() > 0.5
		let str = null
		if (first) {
			str = await fetch(`${array[0]}/${req.params.id}`, {
				method: "GET",
				headers: {
					"X-API-KEY": "bet3M-UENP"
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
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

async function createLutas(app){
    app.post("/lutas", (req, res) => {
		str = await fetch(array[0], {
			method: "POST",
			headers: {
				"X-API-KEY": "bet3M-UENP",
			},
			body: JSON.stringify(req.body)
		})

		str = await fetch(array[1], {
			method: "POST",
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			},
			body: JSON.stringify(req.body)
		})
		
	})
}

async function updateLutas(app){
    app.put("/lutas/:id", (req, res) => {
		const body = JSON.stringify(req.body)
		const id = req.params.id
		await fetch(`${array[0]}/${id}`, {
			method: "PUT",
			body: body,
			headers: {
				"X-API-KEY": "bet3M-UENP",
			}
		})

		await fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: body,
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			}
		})

	})
}

async function deleteLutas(app){
    app.delete("/lutas/:id", (req, res) => {
		const id = req.params.id
		await fetch(`${array[0]}/${id}`, {
			method: "DELETE",
			body: body,
			headers: {
				"X-API-KEY": "bet3M-UENP",
			}
		})

		await fetch(`${array[1]}/${id}`, {
			method: "DELETE",
			body: body,
			headers: {
				//TODO
				"CRIPTOGRAFIA": null,
			}
		})
	})
}
