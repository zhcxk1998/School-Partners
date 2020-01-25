import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const CustomBreadcrumb = ({ list }: { list: Array<string> }) => (
  <Breadcrumb style={{ marginBottom: 16 }}>
    <Breadcrumb.Item><Link to='/admin'>首页</Link></Breadcrumb.Item>
    {list && list.map((item: string) => {
      return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
    })}
  </Breadcrumb>
)
export default CustomBreadcrumb