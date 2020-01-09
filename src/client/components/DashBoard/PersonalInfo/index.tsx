import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import infoStore from '../../../store/infoStore'

import './index.scss'

interface IProps {
  infoStore: infoStore,
}

@inject('infoStore')
@observer
class PersonalInfo extends Component<IProps, {}> {
  render() {
    const { infoStore: { userInfo } } = this.props
    const { avatarUrl, nickName } = userInfo
    return (
      <View className='information-container'>
        <View className='information-wrap'>
          <Image className='avatar' src={avatarUrl} lazyLoad></Image>
          <View className='nickname'>
            <View>{nickName}</View>
            <View className='tag'>北京师范大学珠海分校的一名小菜鸡</View>
          </View>
          <View className='status'>
            <View className='status-wrap'>
              <View className='amount'>
                4
                </View>
              <View>通过课程</View>
            </View>
            <View className='status-wrap'>
              <View className='amount'>
                3
                </View>
              <View>完成题库</View>
            </View>
            <View className='status-wrap'>
              <View className='amount'>
                12
                </View>
              <View>收藏</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default PersonalInfo as ComponentType
