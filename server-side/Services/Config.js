import axios from 'axios'

const Config = axios.create({
    baseURL:'http://localhost:9200/'
})

export default Config