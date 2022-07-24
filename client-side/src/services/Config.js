import axios from 'axios'


const Config = axios.create({
    baseURL:'http://localhost:1234/backend/'
})

export default Config