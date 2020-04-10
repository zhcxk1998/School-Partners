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
    setOpenedKeys(openedKey)
  }

  return (
    <Sider className="sider-nav__container">
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
          <Menu.Item key="/admin/content/course-list">
            <Link to="/admin/content/course-list">课程管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/content/exam-list">
            <Link to="/admin/content/exam-list">考试管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/content/mark-paper">
            <Link to="/admin/content/mark-paper">批阅作业</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="/admin/class"
          title={
            <span>
              <Icon type="user" />
              班级建设
            </span>
          }
        >
          <Menu.Item key="/admin/class/class-dashboard">
            <Link to="/admin/class/class-dashboard">班级管理</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/#">1</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/#">2</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/#">3</Link>
          </Menu.Item>
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