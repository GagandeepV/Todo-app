import express from 'express'
import Config from "../Services/Config.js";

const router = express.Router()

const getElasticBackend = async () => {
    try {
        const { data: { hits: { hits = [] } } } = await Config.get('/elastic-backend/todos/_search')
        const requiredData = hits.map(({ _source }) => _source)
        return requiredData
    }
    catch (error) {
        return []
    }
}

router
    .route('/')
    .get(async (req, res) => {
        const response = await getElasticBackend()
        res.json(response)
    })
    .post(async (req, res) => {
        const { body, body: { id } } = req
        await Config.post(`/elastic-backend/todos/${id}`, body)
        res.send(`Added/Modified data with id ${id}`)
    })
    .delete(async (req, res) => {
        const { body: { id } } = req
        await Config.delete(`/elastic-backend/todos/${id}`)
        res.send(`Deleted data with id ${id}`)
    })

    
export default router