import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'

import './index.scss'


interface IProps {
}

interface IState {
}

class CourseVideo extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '课程视频',
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View>
        <Video
          className="video"
          src='http://cdn.algbb.cn/test.mp4'
          controls={true}
          autoplay={false}
          poster='http://cdn.algbb.cn/cover.png'
          id='video'
          loop={false}
          muted={false}
        /></View>
    )
  }
}

export default CourseVideo as ComponentType
