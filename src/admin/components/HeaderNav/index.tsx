import React, { FC, useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu, Dropdown, Icon, message } from 'antd'
import http from '@/admin/utils/http'

import './index.scss'

const HeaderNav: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const { data: { username } } = await http.get('/info')
    setUsername(username)
  }

  const handleLogout = () => {
    const { history } = props
    message.success('退出成功')
    localStorage.removeItem('token')
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        个人信息
      </Menu.Item>
      <Menu.Item>
        <Icon type="setting" />
        管理设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>
        <Icon type="poweroff" />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="header__container">
      <div className="header__wrap">
        <div className="logo">
          School-Partners
        </div>
        <Dropdown overlay={menu}>
          <div className="info">
            <span>{username}</span>
            <img src="http://cdn.algbb.cn/avatar" width="35" height="35" />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}


export default withRouter(HeaderNav)