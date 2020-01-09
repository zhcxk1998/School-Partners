import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
  link: string
}

interface IState {

}
class Title extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }


  async componentDidShow() {

  }

  render() {
    const { children, link } = this.props
    return (
      <View className='title'>
        <View>{children}</View>
        <View className='link' onClick={() => Taro.navigateTo({ url: `/pages/${link}/index` })}>更多</View>
      </View>
    )
  }
}

export default Title as ComponentType<IProps>
