import express from 'express'
import { apiKeyAuth } from './security.js';
import { generateKey } from "./auth.js"
import * as apostas from "./apostas.js";
import * as apostadores from "./apostadores.js"
import * as lutadores from "./lutadores.js"
import * as lutas from "./lutas.js";

const app = express()
app.use(express.json())
app.use(apiKeyAuth)

app.get('/', (req, res) => {
  res.json({ rotas: ["/apostas", "/apostadores", "/lutadores", "/lutas"] })
})

apostas.getApostas(app)
apostas.getApostasById(app)
apostas.createApostas(app)
apostas.updateApostas(app)
apostas.deleteApostas(app)

apostadores.getApostadores(app)
apostadores.getApostadoresById(app)
apostadores.createApostadores(app)
apostadores.updateApostadores(app)
apostadores.deleteApostadores(app)

lutadores.getLutadores(app)
lutadores.getLutadoresById(app)
lutadores.createLutadores(app)
lutadores.updateLutadores(app)
lutadores.deleteLutadores(app)

lutas.getLutas(app)
lutas.getLutasById(app)
lutas.createLutas(app)
lutas.updateLutas(app)
lutas.deleteLutas(app)

app.listen(3000, async () => {
  try {
    await generateKey()
  } catch (error) {
    console.error('Falha ao gerar chaves', error.message)
  }
  console.log('Servidor rodando em http://localhost:3000')
})