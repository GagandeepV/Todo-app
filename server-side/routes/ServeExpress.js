import express from 'express'

const router = express.Router()

let data = []

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


//old format or methods -- just for reference
// router.get('/', (req, res) => {
//     res.json(data)
// })
// router.route('/:id')
//     .get((req, res) => {
//         const { id } = req.params
//         let index = data.findIndex((f) => f.id === Number.parseInt(id))
//         if (index >= 0) res.json(data[index])
//         else {
//             res.status(404)
//             res.end()
//         }
//     })
//     .post((req, res) => {
//         const { id, input, status } = req.body
//         const objectToPush = { id: id, input: input, status: status }
//         data.push(objectToPush)
//         res.json(objectToPush)
//     })
//     .put((req, res) => {
//         const { id } = req.params
//         const { input, status } = req.body
//         let index = data.findIndex((f) => f.id === Number.parseInt(id))
//         if (index >= 0) {
//             let objectFromData = data[index]
//             objectFromData.input = input
//             objectFromData.status = status
//             res.json(objectFromData)
//         } else {
//             res.status(404)
//             res.end()
//         }
//     })
//     .delete((req, res) => {
//         const { id } = req.params
//         let index = data.findIndex((f) => f.id === Number.parseInt(id))
//         if (index >= 0) {
//             data.splice(index, 1)
//             res.send(`Deleted todo with id ${id}`)
//         } else {
//             res.status(404)
//             res.end()
//         }
//     })

export default router
