const express = require('express')

// Ruan
export async function authRuan() {
    const res = await fetch("https://api-apostadores-fight-azure.vercel.app/login", {
        method: "POST",   
        body: JSON.stringify({
            "usuario": "admin",
            "senha": "123"
        })
    })
    const json = await res.json()
    return json.token
}

// Foguinho

// Vitor

// Duduzao
export async function authDuduzao(){
    const res = await fetch("https://api-aposta-lutas.vercel.app/auth/login", {
        method: "POST",
        body: JSON.stringify({
            "usuario": "bet3M",
            "senha": "bet3MM"
        })
    })
    const json = await res.json()
    return json.token
}
