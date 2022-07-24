import express from "express";
import cors from 'cors'
import router from "./routes/ServeElastic.js";

const app = express()
const bodyParser = express.json()
const PORT = 4321

app.use(cors())
app.use(bodyParser)

app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`The server is up and running on port ${PORT}`)
})