import axios, { AxiosError, type AxiosResponse } from 'axios'
import Swal from 'sweetalert2'

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
    if (error.response?.status == 401) {
      Swal.fire({
        title: 'Session หมดอายุ',
        text: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    }
    return Promise.reject(error)
  })

export default api