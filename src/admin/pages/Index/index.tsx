import React, { ComponentType, useEffect, useState } from 'react'
import { Col, Button, Icon, Row } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '@/admin/hooks/useStore'
import http from '@/admin/utils/http'

import './index.scss'

interface DashBoardInfo {
  classCode: string,
  classMember: number,
  courseCount: number,
  exerciseCount: number
}

const Index = (props: any) => {
  const [dashboardInfo, setDashboardInfo] = useState<DashBoardInfo>({})
  const { userInfoStore } = useStore()
  const { username, isActived } = userInfoStore

  useEffect(() => {
    getDashboardInfo()
  }, [])

  const getDashboardInfo = async () => {
    const { data: { dashboardInfo } } = await http.get('/dashboard')
    setDashboardInfo(dashboardInfo)
  }

  const overviewList = [
    { count: 8, description: '发布课程' },
    { count: 12, description: '发布题库' },
    { count: 3294, description: '班级人数' },
    { count: 'A2BFE7', description: '班级代号' },
  ]

  const bookList = [
    {
      name: '深入浅出React和Redux', description: '本书由浅入深地介绍如何用React和Redux构建现代化的、高效的前端项目，产出高质量的前端代码。', link: '/', cover: 'http://img13.360buyimg.com/n1/jfs/t5107/58/1653926146/128683/79be7ee8/5912e2fcNf9a839fc.jpg',
    },
    {
      name: 'React进阶之路', description: '本书详细介绍了React技术栈设计的主要技术。本书分为基础篇、进阶篇和实战篇三部分。基础篇主要介绍React的基本用法，包括React16的新特性', link: '/', cover: 'http://img12.360buyimg.com/n1/jfs/t18535/190/1289736068/101782/6c6ab901/5ac46127Nbaa19e5d.jpg',
    },
  ]

  return (
    <div className="dashboard__container">
      <div className="dashboard__background" />
      <div className="dashboard__wrap">
        <div className="overview__container">
          <div className="overview__header">
            <div className="description">
              <div className="title">欢迎回来 {username} 老师</div>
                这是班级近期的状态概览，快点来看一下吧！
              </div>
            <Button type="primary" size="large" shape="round" onClick={() => userInfoStore.increment()}>修改个人资料</Button>
          </div>
          <Row className="overview__content" type="flex" justify="space-between">
            <Col span={5} className="count">
              {dashboardInfo.courseCount}
              <div className="description">
                发布课程
              </div>
            </Col>
            <Col span={5} className="count">
              {dashboardInfo.exerciseCount}
              <div className="description">
                发布题库
              </div>
            </Col>
            <Col span={5} className="count">
              {dashboardInfo.classMember}
              <div className="description">
                班级人数
              </div>
            </Col>
            <Col span={5} className="count">
              {dashboardInfo.classCode}
              <div className="description">
                班级代码
              </div>
            </Col>
          </Row>
        </div>
        <div className="data__container">
          <div className="data__header">
            班级资料
            </div>
          <Row className="data__content" type="flex" justify="space-between">
            <Col span={7} className="data__wrap">
              <div className="title">
                <Icon type="book" style={{ color: '#66a6ff' }} />
                  &nbsp;本周考试日程
                  <div className="description">
                  请提醒学生进行考试哦，以免挂科^_^
                  </div>
              </div>
              <div className="data__button"><Button type="primary" block>查看更多</Button></div>
            </Col>
            <Col span={7} className="data__wrap">
              <div className="title">
                <Icon type="pie-chart" style={{ color: '#66a6ff' }} />
                  &nbsp;学习情况分析
                  <div className="description">
                  学生最近学习时间的情况分析
                  </div>
              </div>
            </Col>
            <Col span={7} className="data__wrap">
              <div className="title">
                <Icon type="carry-out" style={{ color: '#66a6ff' }} />
                  &nbsp;课程任务列表
                  <div className="description">
                  以下是您布置的课程任务嘿嘿嘿
                  </div>
              </div>
              <div className="task__container">
                <div className="task__wrap">
                  <div className="id">1</div>
                  <div className="info">
                    <div className="name">观看三次课程 (1/3)</div>
                    <div className="price">积分 +3</div>
                  </div>
                  <button className="btn" type="button">去完成</button>
                </div>
                <div className="task__wrap">
                  <div className="id">2</div>
                  <div className="info">
                    <div className="name">完成两次题库 (0/2)</div>
                    <div className="price">积分 +2</div>
                  </div>
                  <button className="btn" type="button">去完成</button>
                </div>
                <div className="task__wrap">
                  <div className="id">3</div>
                  <div className="info">
                    <div className="name">今日学习三小时 (2/3)</div>
                    <div className="price">积分 +5</div>
                  </div>
                  <button className="btn" type="button">去完成</button>
                </div>
              </div>
              <div className="data__button"><Button type="primary" block>查看更多</Button></div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default observer(Index) as ComponentType