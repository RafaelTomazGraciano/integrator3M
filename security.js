const API_KEY = "Integrator3M"

export function apiKeyAuth(req, res, next){
    const key = req.headers["x-api-key"]

    if(!key){
        return res.status(401).send({ error: "API key ausente"})
    }

    if(key !== API_KEY){
        return res.status(403).send({ error: "API key inválida"})
    }

    next()
}