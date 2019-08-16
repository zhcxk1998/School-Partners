import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView, Image } from '@tarojs/components'

import './index.scss'


interface IProps {

}

interface IState {

}
class List extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  async componentDidShow() {
  }


  render() {
    return (
      <View className='list-container'>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <View className='list-wrap' key={index}>
              <View className='list-preview'>
                
              </View>
              <View className='list-content'>

              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default List 
