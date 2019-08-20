import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import studyStore from '../../store/studyStore';
import exerciseStore from '../../store/exerciseStore'

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
        <Title>推荐课程</Title>
        <Banner studyStore={new studyStore()} />

        <Title>热门题库</Title>
        <List studyStore={new studyStore()} exerciseStore={new exerciseStore()} />
        {/* <View>illustration by Ouch.picshttps://icons8.com</View> */}
      </View>
    )
  }
}

export default Study as ComponentType
