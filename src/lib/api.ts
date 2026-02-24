import axios, { AxiosError, type AxiosResponse } from 'axios'

const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use((
  response: AxiosResponse) => response,
  (error: AxiosError) => {
    if(error.response?.status == 401){
      window.location.href = '/login'
    }
})

export default api