import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtActivityIndicator } from 'taro-ui'

import studyStore from '../../../store/studyStore'
import courseStore from '../../../store/courseStore'

import './index.scss'


interface IProps {
  studyStore: studyStore,
  courseStore: courseStore
}

interface IState {

}

@inject('studyStore', 'courseStore')
@observer
class Banner extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {

  }

  render() {
    const { studyStore: { recommendCourseList }, courseStore: { getCourseDetail } } = this.props;
    return recommendCourseList && recommendCourseList.slice().length !== 0 ? (
      <ScrollView
        className='banner-container'
        scrollX
        scrollWithAnimation
      >
        {recommendCourseList.map((item, index) => {
          const { courseCid, courseName } = item;
          return (
            <View className='banner-item' key={courseCid} onClick={() => { getCourseDetail(courseCid, courseName) }}>
              <View className='title'>{courseName}</View>
              <Image className='bg' src={`http://cdn.algbb.cn/study/banner/${index + 1}.svg`} lazyLoad />
            </View>
          )
        })}
      </ScrollView>
    ) : (
        <View className='banner-loading'>
          <AtActivityIndicator size={40} content='加载中' mode='center'></AtActivityIndicator>
        </View>
      )
  }
}

export default Banner as ComponentType
