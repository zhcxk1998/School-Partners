import React from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index/index'

import store from './store/index'

import './app.scss'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = {
//   counterStore
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/exerciseDetail/index',
      'pages/chatroom/index',
      'pages/courseDetail/index',
      'pages/courseList/index',
      'pages/exerciseList/index',
      'pages/rankList/index',
      'pages/forumDetail/index',
      'pages/myForums/index',
      'pages/forumPublish/index',
      'pages/forumModify/index',
      'pages/mySchedule/index',
      'pages/courseVideo/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      backgroundColor: '#f7f7f7',
      navigationBarBackgroundColor: '#66a6ff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'white',
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
