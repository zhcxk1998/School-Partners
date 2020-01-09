import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IProps {

}

class Recommend extends Component<IProps, {}> {
  render() {
    return (
      <View className='recommend-link-container'>
        <View className='wrap'>
          <Image className='img' src='http://cdn.algbb.cn/dashboard/recommend1.png' />
          <View className='slogan'>康康学堂</View>
        </View>
        <View className='wrap'>
          <Image className='img' src='http://cdn.algbb.cn/dashboard/recommend2.png' />
          <View className='slogan'>惠惠学堂</View>
        </View>
      </View>
    )
  }
}

export default Recommend as ComponentType
