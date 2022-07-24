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

router.get('/', async (req, res) => {
    const response = await getElasticBackend()
    res.json(response)
})

router
    .route('/:id')
    .get(async(req,res)=>{
        const {params:{id:paramID}} = req
        const response = await getElasticBackend()
        const specificResponse = response.filter(({id})=>id === Number.parseInt(paramID))
        res.json(specificResponse)
    })
    .post(async (req, res) => {
        const { body, params: { id } } = req
        await Config.post(`/elastic-backend/todos/${id}`, body)
        res.send(`Added/Modified data with id ${id}`)
    })
    .delete(async (req, res) => {
        const { params: { id } } = req
        await Config.delete(`/elastic-backend/todos/${id}`)
        res.send(`Deleted data with id ${id}`)
    })


export default router