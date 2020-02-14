import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import Routes from '../routes'

import store from '../store'

const App = () => (
  <div>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Provider {...store}>
          <Routes />
        </Provider>
      </Router>
    </ConfigProvider>
  </div>
)

export default App
