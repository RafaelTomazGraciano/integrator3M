const express = require('express')
export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

app.get('/', (req, res) => {
  
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})