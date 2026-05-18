const express = require('express')
import { authDuduzao } from './auth'

const array = ["https://api-aposta-lutas.vercel.app/apostas", "other"]

async function getApostas(app) {
    app.get("/apostadores", (req, res) => {
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