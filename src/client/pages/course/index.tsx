import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import courseStore from '../../store/courseStore'

import './index.scss'

interface IProps {
  courseStore: courseStore
}

interface IState {

}

@inject('courseStore')
@observer
class Course extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentWillMount() {
  }

  render() {
    const { courseStore: { courseDetail } } = this.props
    const { courseAuthor, publishDate, courseViews, courseDescription, stepName, stepDetail, courseRate } = courseDetail
    return (
      <View className='course'>
        <View className='course-background' />
        <View className='course-container'>
          <View className='course-container__header' />
          <View className='course-container__info'>
            <Image className='info__avatar' src='https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132' />
            <View className='info__wrap'>
              <View className='info__header'>
                <View>by {courseAuthor}</View>
                <AtRate value={courseRate} />
              </View>
              <View className='info__footer'>
                <View>{publishDate}</View>
                <View>Reviews {courseViews}</View>
              </View>
            </View>
          </View>
          <View className='course-container__description'>
            <View className='description__title'>
              课程描述
            </View>
            <View className='description__content'>
              {courseDescription}
            </View>
          </View>
          <View className='course-container__path'>
            <View className='path__title'>
              课程步骤
            </View>
            <View className='path__container'>
              {stepName.map((name, index) => (
                <View className='path__wrap' key={index}>
                  <Image src='http://cdn.algbb.cn/course/read.png' className='path__icon' />
                  <View className='path__info'>
                    <View className='path__name'>{name}</View>
                    <View className='path__description'>{stepDetail[index]}</View>
                  </View>
                  <View className='path__decoration'>{(index + 1).toString().padStart(2, '0')}</View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Course as ComponentType