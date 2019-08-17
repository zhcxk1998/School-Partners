import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'

import './index.scss'


interface IProps {

}

interface IState {

}

class Banner extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidShow() {

  }

  render() {
    const list: Array<{ title: string, background: string }> = [
      { title: '软件工程', background: 'http://cdn.algbb.cn/study/banner/1.svg' },
      { title: '数据库', background: 'http://cdn.algbb.cn/study/banner/2.svg' },
      { title: 'Java高编', background: 'http://cdn.algbb.cn/study/banner/3.svg' },
      { title: '软件测试', background: 'http://cdn.algbb.cn/study/banner/4.svg' },
      { title: '计算机算法', background: 'http://cdn.algbb.cn/study/banner/5.svg' },
      { title: 'web前端', background: 'http://cdn.algbb.cn/study/banner/6.svg' },
    ]

    return (
      <ScrollView
        className='banner-container'
        scrollX
        scrollWithAnimation
      >
        {list.map((item, index) => {
          const { title, background } = item;
          return (
            <View className='banner-item' key={index}>
              <View className='title'>{title}</View>
              <Image className='bg' src={background} />
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

export default Banner 
