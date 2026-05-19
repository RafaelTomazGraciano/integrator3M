const express = require('express')
import { authRuan } from './auth'

const array = ["https://api-apostadores-fight-azure.vercel.app/apostadores", "https://api-sd-df8o.onrender.com/apostadores"]

export async function getApostadores(app) {
	app.get("/apostadores", (req, res) => {
		let str = null
		const first = Math.random() > 0.5
		if (first) {
			str = await fetch(array[0], {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await authRuan()}`
				}
			})
		}
		else {
			str = await fetch(array[1])
		}
		const json = await str.json()
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

async function getApostadoresById(app) {
	app.get("/apostadores/:id", (req, res) => {
        const id = req.params.id
		const str = await fetch(`${array[0]}/${id}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await authRuan()}`
				}
			})
		const json = await str.json()
		const responseStr = JSON.stringify(json)
		res.send(responseStr)
	})
}

async function createApostadores(app) {
	app.post("/apostadores", (req, res) => {
		const body = req.body
		let str = await fetch(array[0], {
			method: "POST",
			body: body,
			headers: {
				Authorization: `Bearer ${await authRuan()}`
			}
		})
		str = await fetch(array[1], {
			method: "POST",
			body: body
		})
		res.send(body)
	})
}

async function updateApostadores(app) {
	app.put("/apostadores/:id", (req, res) => {
		const id = req.params.id
		const body = req.body
		let str = await fetch(`${array[0]}/${id}`, {
			method: "PUT",
			body: body,
			Authorization: `Bearer ${await authRuan()}`
		})
		let str = await fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: body,
		})
	})
}

async function deleteApostadores(app) {
	app.delete("/apostadores/:id", (req, res) => {
		
	})
}