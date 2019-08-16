import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView, Image } from '@tarojs/components'

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
    return (
      <ScrollView
        className='banner-container'
        scrollX
        scrollWithAnimation
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return (
            <View className='banner-item' key={index}>
              {/* <Image className='bg' src={require('../../../assets/image/test.svg')} /> */}
              
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

export default Banner 
