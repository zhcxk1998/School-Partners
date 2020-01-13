import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8",
  },
  // withCredentials: true
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

const get = (url: string, options?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    instance.get(url, options).then((data) => {
      resolve(data)
    }).catch(({ response }) => {
      const { data: { data } } = response
      message.error(data.msg)
      return reject()
    })
  })
}

const post = (url: string, params: object, options?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    instance.post(url, params, options).then(data => {
      resolve(data)
    }).catch(({ response }) => {
      const { data: { data } } = response
      message.error(data.msg)
      return reject()
    })
  })
}

export default {
  get,
  post
}