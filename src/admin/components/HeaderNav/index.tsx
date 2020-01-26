import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd'

import './index.scss'

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
    <Menu.Item>
      <Icon type="poweroff" />
      退出登录
    </Menu.Item>
  </Menu>
)

const HeaderNav: FC<RouteComponentProps> = () => {
  return (
    <div className="header__container">
      <div className="header__wrap">
        <div className="logo">
          School-Partners
        </div>
        <Dropdown overlay={menu}>
          <div className="info">
            <span>zhcxk1998</span>
            <img src="http://cdn.algbb.cn/avatar" width="35" height="35" />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}


export default withRouter(HeaderNav)