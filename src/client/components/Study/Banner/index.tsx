import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import studyStore from '../../../store/studyStore'

import './index.scss'


interface IProps {
  studyStore: studyStore
}

interface IState {

}

@inject('studyStore')
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
    const { studyStore: { recommendCourseList } } = this.props;
    return (
      <ScrollView
        className='banner-container'
        scrollX
        scrollWithAnimation
      >
        {recommendCourseList && recommendCourseList.map((item, index) => {
          const { course_name } = item;
          return (
            <View className='banner-item' key={index}>
              <View className='title'>{course_name}</View>
              <Image className='bg' src={`http://cdn.algbb.cn/study/banner/${index + 1}.svg`} />
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

export default Banner 
