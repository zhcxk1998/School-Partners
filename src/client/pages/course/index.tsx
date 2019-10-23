import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

interface IProps {

}

interface IState {

}

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
    return (
      <View className='course'>
        <View className='course-background' />
        <View className='course-container'>
          <View className='course-container__header' />
          <View className='course-container__info'>
            <Image className='info__avatar' src='https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132' />
            <View className='info__wrap'>
              <View className='info__header'>
                <View>by Tom Jeson</View>
                <AtRate value={3.5} />
              </View>
              <View className='info__footer'>
                <View>Mar 21 2019</View>
                <View>Reviews 1231</View>
              </View>
            </View>
          </View>
          <View className='course-container__description'>
            <View className='description__title'>
              课程描述
            </View>
            <View className='description__content'>
              能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。
            </View>
          </View>
          <View className='course-container__path'>
            <View className='path__title'>
              课程步骤
            </View>
            <View className='path__container'>
              <View className='path__wrap'>
                <Image src='http://cdn.algbb.cn/course/read.png' className='path__icon' />
                <View className='path__info'>
                  <View className='path__name'>思考，感悟，约束</View>
                  <View className='path__description'>阅读课文</View>
                </View>
                <View className='path__decoration'>01</View>
              </View>
              <View className='path__wrap'>
                <Image src='http://cdn.algbb.cn/course/practice.png' className='path__icon' />
                <View className='path__info'>
                  <View className='path__name'>爱国，敬业，诚信</View>
                  <View className='path__description'>翻译文章</View>
                </View>
                <View className='path__decoration'>02</View>
              </View>
              <View className='path__wrap'>
                <Image src='http://cdn.algbb.cn/course/video.png' className='path__icon' />
                <View className='path__info'>
                  <View className='path__name'>思考，感悟，约束</View>
                  <View className='path__description'>阅读课文</View>
                </View>
                <View className='path__decoration'>03</View>
              </View>
              <View className='path__wrap'>
                <Image src='http://cdn.algbb.cn/course/analyze.png' className='path__icon' />
                <View className='path__info'>
                  <View className='path__name'>爱国，敬业，诚信</View>
                  <View className='path__description'>翻译文章</View>
                </View>
                <View className='path__decoration'>04</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Course as ComponentType