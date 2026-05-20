# Integrator3M

API gateway que agrega e replica operações entre múltiplas APIs externas de um sistema de apostas em lutas.

## Tecnologias

- Node.js 25
- Express

## Instalação e execução

```bash
npm i
npm run dev
```

URL rodando localmente: `http://localhost:3000`

URL para acessar remotamente: ` `

## Autenticação

Todas as requisições devem incluir o header:

```
X-API-KEY: Integrator3M
```

## Endpoints

| Recurso | Rota |
|---|---|
| Apostas | `/apostas` |
| Apostadores | `/apostadores` |
| Lutadores | `/lutadores` |
| Lutas | `/lutas` |

Todos os recursos suportam `GET`, `GET /:id`, `POST`, `PUT /:id` e `DELETE /:id`.

---

### Body `/apostas`

```json
{
  "valor": 150.50,
  "id_luta": 1,
  "id_lutador": 2,
  "id_apostador": 1
}
```

### Body `/apostadores`

```json
{
  "nome": "nome",
  "idade": 47,
  "chave_pix": "123456789"
}
```

### Body `/lutadores`

```json
{
  "nome": "nome",
  "apelido": "apelido",
  "categoria": "categoria",
  "arte": "arte marcial"
}
```

### Body `/lutas`

```json
{
  "horario": "20:00:00",
  "data": "2025-06-15",
  "lutador1": 1,
  "lutador2": 2
}
```
