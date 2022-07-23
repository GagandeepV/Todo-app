import express from 'express'
import cors from 'cors'
import router from './routes/ServeElastic.js'

const app = express()
const bodyParser = express.json()
const PORT = 1234

app.use(cors())
app.use(bodyParser)


app.get('/', (req, res) => {
    res.send('Port - 1234')
})

app.use('/backend', router)

app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
})