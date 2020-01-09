import React, { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import studyStore from '../../store/studyStore';

import List from '../../components/Study/List/index'
import Navigation from '../../components/Study/Navigation/index'
import Title from '../../components/Study/Title/index'
import Banner from '../../components/Study/Banner/index'

import './index.scss'

interface IProps {
  studyStore: studyStore
}

interface IState {

}

@inject('studyStore')
@observer
class Study extends Component<IProps, IState> {

  config: Config = {
    navigationBarTitleText: '学习',
  }

  constructor(props: IProps) {
    super(props);
    this.state = {

    }
  }

  async componentWillMount() {
    Taro.showLoading({
      title: '加载中...'
    })
    const { studyStore: { getCourseList, getExerciseList } } = this.props;
    await getCourseList()
    await getExerciseList()
    Taro.hideLoading()
  }

  render() {
    return (
      <View className='study-container'>
        <View className='study-banner'>
          <Image className='bg' src={'http://cdn.algbb.cn/study/banner-bg.svg'}></Image>
          <View className='slogan'>
            <View><View className='title'>Hey Guys</View >come to study !</View>
            <View className='button'>Let's start</View>
          </View>
        </View>
        <Navigation />
        <Title link='courseList'>推荐课程</Title>
        <Banner />
        <Title link='exerciseList'>热门题库</Title>
        <List />
      </View>
    )
  }
}

export default Study as ComponentType
