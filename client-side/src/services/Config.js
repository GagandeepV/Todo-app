import axios from 'axios'


const Config_e = axios.create({
    baseURL:'http://localhost:1234/backend/'
})

const Config_es = axios.create({
    baseURL:'http://localhost:4321/'
})

export  {Config_e, Config_es}