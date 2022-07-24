import express from 'express'

const router = express.Router()

let data = []

router.get('/', (req, res) => {
    res.json(data)
})

router
    .route('/:id')
    .get((req, res) => {
        const { params: { id: reqID } } = req
        data = [...data.filter(({ id: dataID }) => dataID === Number.parseInt(reqID))]
        res.json(data)
    })
    .post((req, res) => {
        const { body: { id, ...rest } } = req
        data = [...data, { id, ...rest }]
        res.send(`Added data with id ${id}`)
    })
    .put((req, res) => {
        const { params: { id: reqID }, body } = req
        data = [ ...data.map(({ id: dataID, ...rest }) => dataID === Number.parseInt(reqID) ? ({ id: dataID, ...rest, ...body }) : ({ id: dataID, ...rest }))]
        console.log(data);
        res.send(`Modified data with id ${reqID}`)
    })
    .delete((req, res) => {
        const { params: { id: reqID } } = req
        data = [...data.filter(({ id: dataID }) => Number.parseInt(reqID) !== dataID)]  
        res.send(`Deleted data with id ${reqID}`)
    })


export default router



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