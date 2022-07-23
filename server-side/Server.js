import express from 'express'

const app = express()
const PORT = 1234

app.get('/', (req,res)=>{
    res.send('Port - 1234')
})

app.get('/api', (req,res)=>{
    res.json({a:1,b:2})
})

app.listen(PORT, ()=>{
    console.log(`The server is up and running on port ${PORT}`);
})