import React, { ComponentType, useState, useEffect } from 'react'

import http from '@/admin/utils/http'

import './index.scss'

const Index = () => {
  const [content, setContent] = useState('index')

  useEffect(() => {
    (async () => {
      const res = await http.get('/info')
      console.log(res)
    })()
  })

  return (
    <div>{content}</div>
  )
}

export default Index as ComponentType