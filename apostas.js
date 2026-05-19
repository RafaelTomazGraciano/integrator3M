const express = require('express')
import { authDuduzao } from './auth'

const array = ["https://api-aposta-lutas.vercel.app/apostas", "other"]

async function getApostas(app) {
    app.get("/apostas", (req, res) => {
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
        const responseStr = JSON.stringify(json)
        res.send(responseStr)
    })
}

async function getApostasById(app) {
    app.get("/apostas/:id", (req, res) => {
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
        const responseStr = JSON.stringify(json)
        res.send(responseStr)
    })
}

async function createApostas(app){
    app.post("/apostas", (req, res) => {
		str = await fetch(array[0], {
			method: "POST",
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
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

async function updateApostas(app) {
    app.put("/apostas/:id", (req, res) => {
		const body = JSON.stringify(req.body)
		const id = req.params.id
		await fetch(`${array[0]}/${id}`, {
			method: "PUT",
			body: body,
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
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

async function deleteApostas(app){
    app.put("/apostas/:id", (req, res) => {
		const body = JSON.stringify(req.body)
		const id = req.params.id
		await fetch(`${array[0]}/${id}`, {
			method: "DELETE",
			body: body,
			headers: {
				Authorization: `Bearer ${await authDuduzao()}`
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