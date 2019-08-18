import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'


interface IProps {

}

interface IState {

}
class Title extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  async componentDidShow() {
  }


  render() {
    return (
      <View className='title'>
        <View>{this.props.children}</View>
        <View className='link'>更多</View>
      </View>
    )
  }
}

export default Title 
