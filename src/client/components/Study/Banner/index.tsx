import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtActivityIndicator } from 'taro-ui'

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
    return recommendCourseList && recommendCourseList.slice().length !== 0 ? (
      <ScrollView
        className='banner-container'
        scrollX
        scrollWithAnimation
      >
        {recommendCourseList.map((item, index) => {
          const { courseCid, courseName } = item;
          return (
            <View className='banner-item' key={courseCid}>
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

export default Banner 
