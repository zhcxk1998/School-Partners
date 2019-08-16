import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView, Image } from '@tarojs/components'
// import { observer, inject } from '@tarojs/mobx'

import List from '../../components/Study/List/index'
import Navigation from '../../components/Study/Navigation/index'
import Title from '../../components/Study/Title/index'
import Banner from '../../components/Study/Banner/index'
import './index.scss'


interface IProps {

}

interface IState {

}
class Study extends Component<IProps, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '学习'
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  async componentDidShow() {
  }


  render() {
    return (
      <View className='study-container'>
        <View className='study-banner'>
          <Image className='bg' src={require('../../assets/image/banner-bg.svg')}></Image>
          <View className='slogan'>
            <View><View className='title'>Hey Guys</View >come to study !</View>

            <View className='button'>Let's start</View>
          </View>
        </View>
        <Navigation />
        <Title>热门课程</Title>
        <Banner />

        <Title>推荐题库</Title>
        <List />
      </View>
    )
  }
}

export default Study as ComponentType
