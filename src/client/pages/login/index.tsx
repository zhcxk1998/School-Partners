import React, { ComponentType } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import infoStore from '../../store/infoStore'

import './index.scss'


interface IProps {
  infoStore: infoStore
}

interface IState {
}

@inject('infoStore')
@observer
class Login extends Component<IProps, IState> {

  getUserInfo(e: any) {
    const { detail: { userInfo } } = e
    console.log(userInfo)
    if (userInfo) {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      Taro.showToast({
        title: '不允许可不行哦~',
        icon: 'none'
      })
    }
  }

  render() {
    return (
      <View className="login__container">
        <Image className="login__image" src="http://cdn.algbb.cn/login.svg" />
        <View className="login__wrap">
          <View>亲~您还没有登录哟</View>
          <View>需要登录后才能访问我们的页面哟</View>
        </View>
        <Button className="login__button" openType="getUserInfo" onGetUserInfo={this.getUserInfo}>点我登录</Button>
      </View>
    )
  }
}

export default Login as ComponentType
