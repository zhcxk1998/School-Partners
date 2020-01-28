import { useEffect, useState, useRef, useCallback } from 'react'
import { message } from 'antd'
import { FetchConfig } from '@/admin/modals/http'
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
    switch (status) {
      case 401:
        localStorage.removeItem('token')
        window.location.href = './#/login'
        break;
      case 504:
        message.error('代理请求失败')
    }
    return Promise.reject(error)
  }
)

const useService = (fetchConfig: FetchConfig) => {
  const preParams = useRef({})
  const [callback, { isLoading, error, response }] = useServiceCallback(fetchConfig)

  useEffect(() => {
    if (preParams.current !== fetchConfig && fetchConfig.url !== '') {
      preParams.current = fetchConfig
      callback()
    }
  })

  return { isLoading, error, response }
}

const useServiceCallback = (fetchConfig: FetchConfig) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const { url, method, params = {}, config = {} } = fetchConfig

  const callback = useCallback(
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
          setResponse(Object.assign({}, response))
        })
        .catch((error: any) => {
          const { response: { data } } = error
          const { data: { msg } } = data
          message.error(msg)
          setIsLoading(false)
          setError(Object.assign({}, error))
        })
    }, [fetchConfig]
  )

  return [callback, { isLoading, error, response }] as const
}

export default useService