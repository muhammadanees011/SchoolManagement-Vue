import axios from 'axios'
import store from './store/modules/auth'

const axiosClient = axios.create({
  baseURL: 'https://api.student-pay.co.uk/api',
})

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.accessToken}`
  return config
})

export default axiosClient
