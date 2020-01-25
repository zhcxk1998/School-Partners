import React, { ComponentType, FC, useEffect, useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu;
const { Sider } = Layout

import './index.scss'

const SiderNav: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [selectedKeys, setSelectedKeys] = useState(['index'])
  const [openedKeys, setOpenedKeys] = useState([''])
  const { location: { pathname } } = props
  const rank = pathname.split('/')

  useEffect(() => {
    switch (rank.length) {
      case 2: // 一级目录
        setSelectedKeys([pathname])
        setOpenedKeys([''])
        break
      case 4: // 二级目录
        setSelectedKeys([pathname])
        setOpenedKeys([rank.slice(0, 3).join('/')])
        break
    }
  }, [pathname])

  const handleMenuChange = (openedKey: Array<string>): void => {
    setOpenedKeys([openedKey[1]])
  }

  return (
    <Sider width={200} style={{ background: '#fff', height: 'calc(100vh - 50px)' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['/admin']}
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        onOpenChange={handleMenuChange}
      >
        <Menu.Item key="/admin">
          <Link to="/admin">
            <Icon type="home" />
            首页
        </Link>
        </Menu.Item>
        <SubMenu
          key="/admin/content"
          title={
            <span>
              <Icon type="profile" />
              内容管理
            </span>
          }
        >
          <Menu.Item key="/admin/content/exercise-list">
            <Link to="/admin/content/exercise-list">题库管理</Link>
          </Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="notification" />
              subnav 3
            </span>
          }
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default withRouter(SiderNav) as ComponentType