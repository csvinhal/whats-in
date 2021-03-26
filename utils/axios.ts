import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
})

const backendAxiosInstance = axios.create({
    baseURL: process.env.backendUrl,
})

export { axiosInstance, backendAxiosInstance }
