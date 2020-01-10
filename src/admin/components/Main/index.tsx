import React, { ComponentType } from 'react'
import { Layout } from 'antd';

import HeaderNav from '../HeaderNav'
import ContentMain from '../ContentMain'
import SiderNav from '../SiderNav'

import './index.scss'

const Main = () => (
  <Layout className="index__container">
    <HeaderNav />
    <Layout>
      <SiderNav />
      <Layout>
        <ContentMain />
      </Layout>
    </Layout>
  </Layout>
)

export default Main as ComponentType