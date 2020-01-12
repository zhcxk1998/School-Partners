import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  },
  // withCredentials: true
})

const post = (url: string, params: object, options?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    instance.post(url, params, options).then(({ data }) => {
      resolve(data)
    }).catch(({ response }) => {
      const { data: { data } } = response
      message.error(data.msg)
      return reject()
    })
  })
}

export default {
  post
}