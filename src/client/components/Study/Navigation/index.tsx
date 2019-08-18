import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'


interface IProps {

}

interface IState {

}
class Navigation extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  async componentDidShow() {
  }


  render() {
    const navigator: Array<{ title: string, icon: string }> = [
      { title: '课程', icon: 'icon-course' },
      { title: '做题', icon: 'icon-exam' },
      { title: '分类', icon: 'icon-type' },
      { title: '排行', icon: 'icon-rank' }
    ]

    return (
      <View className='navigation'>
        <View className='navigation-container'>
          {navigator.map((item, index) => {
            const { title, icon } = item;
            return (
              <View className='link-wrap' key={index} >
                <View className='link-icon'>
                  <View className={`iconfont ${icon}`}></View>
                </View>
                <View>{title}</View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Navigation 
