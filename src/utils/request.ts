import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (store.getters['UserModule/token']) {
      config.headers.Authorization = `Bearer ${store.getters['UserModule/token']}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
