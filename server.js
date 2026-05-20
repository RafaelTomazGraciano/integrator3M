import express from 'express'
import { generateKey } from "./auth.js"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ rotas: ["/apostadores", "/apostas", "/lutadores", "/lutas"] })
})

app.listen(3000, async () => {
  await generateKey()
  console.log('Servidor rodando em http://localhost:3000')
})