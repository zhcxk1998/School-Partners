import { useEffect, useState } from 'react'
import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8",
  },
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    let { data, status } = res
    if (status === 200) {
      return data
    }
    return Promise.reject(data)
  },
  error => {
    const { response: { status } } = error
    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = './#/login'
    }
    return Promise.reject(error)
  }
)

const useService = (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', params?: object, config?: object) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(
    () => {
      setIsLoading(true)
      setError(null)
      instance(url, {
        method,
        data: params,
        ...config
      })
        .then((response: any) => {
          setIsLoading(false)
          setResponse(response)
        })
        .catch((error: any) => {
          const { response: { data } } = error
          const { data: { msg } } = data
          message.error(msg)
          setIsLoading(false)
          setError(error)
        })
    },
    [])
  return { isLoading, error, response }
}

export default useService