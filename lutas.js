import { headersRSA } from "./auth.js";


const array = [
  "https://bet3m-production.up.railway.app/lutas",
  "https://betting-api-lutas.vercel.app/lutas",
];    

/* 
Array0
{
	data: "2026-07-20",
	horario: "22:00",
	lutador1: 1,
	lutador2: 2,
}

Array1
{
	data: "2026-07-20",
	horario: "23:00",
	id_lutador1: 1,
	id_lutador2: 2,
}
*/

const baseRoute =  "/lutas"

function convertToStandart(json) {

	if (Array.isArray(json)) {
		if ("lutador1" in json[0]) return json

		const newArray = new Array(json.length)
		for (let i = 0; i < json.length; i++) {
			const elem = json[i];
			newArray[i] = {
				data: elem.data,
				horario: elem.horario,
				lutador1: elem.id_lutador1,
				lutador2: elem.id_lutador2
			}
		}
		return newArray;
	}

	if ("lutador1" in json) return json

	json.lutador1 = json.id_lutador1
	json.lutador2 = json.id_lutador2
	delete json.id_lutador1
	delete json.id_lutador2
	return json
}

function getLutasObj(json) {
	const json1 = {
		horario: json.horario,
		data: json.data
	}

	if ("id_lutador1" in json)  {
		json1.lutador1 = json.id_lutador1
		json1.lutador2 = json.id_lutador2
		return [json1, json]
	}

	json1.id_lutador1 = json.lutador1
	json1.id_lutador2 = json.lutador2
	return [json, json1]
}

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
				console.log("Aqui")
				str = await fetch(array[1], {
					method: "GET",
					headers: headersRSA(baseRoute)
				})
			}
			const json = await str.json()
			console.log(json)
			const response = convertToStandart(json)
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
						headers: headersRSA(baseRoute)
					})
				}
				const json = await str.json()
				console.log(json)
				const response = convertToStandart(json)
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
					headers: headersRSA(`${baseRoute}/${id}`)
				})
			}
			const json = await str.json()
			const response = convertToStandart(json)
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
						headers: headersRSA(`${baseRoute}/${id}`)
					})
				}
				const json = await str.json()
				const response = convertToStandart(json)
				return res.send(json)
			} catch (err2) {
				return res.status(500).send({ error: err2.message })
			}
		}
	})
}

export async function createLutas(app){
	app.post("/lutas", async (req, res) => {
		const [bet3mJson, littleFireJson] = getLutasObj(req.body)

		const request1 = fetch(array[0], {
			method: "POST",
			headers: {
				"X-API-KEY": "bet3M-UENP",
			},
			body: JSON.stringify(bet3mJson)
		})

		const request2 = fetch(array[1], {
			method: "POST",
			headers: headersRSA(`${baseRoute}`),
			body: JSON.stringify(littleFireJson)
		})
		const [res1, res2] = await Promise.all([request1, request2])

		res.send(req.body)
	})
}

export async function updateLutas(app){
	app.put("/lutas/:id", async (req, res) => {
		const [bet3mJson, littleFireJson] = getLutasObj(req.body)
		const id = req.params.id
		const request1 = fetch(`${array[0]}/${id}`, {
			method: "PUT",
			headers: {
				"X-API-KEY": "bet3M-UENP",
			},
			body: JSON.stringify(bet3mJson),
		})
		
		const request2 = fetch(`${array[1]}/${id}`, {
			method: "PUT",
			body: JSON.stringify(littleFireJson),
			headers: headersRSA(`${baseRoute}/${id}`)
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
			headers: headersRSA(`${baseRoute}/${id}`)
		})
		await Promise.all([request1, request2])
		res.send({msg: "Deletado"})
	})
}