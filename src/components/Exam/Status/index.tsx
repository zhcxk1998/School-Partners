import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

interface IProps {
  current: number
}

class Status extends Component<IProps, {}> {

  render() {
    const { current } = this.props;
    return (
      <View className='exam-status'>
        <View className='star'>
          <AtIcon value='star' size='16' color='#666'></AtIcon>
          <Text className='tag'>收藏</Text>
        </View>
        <View className='progress'>
          <AtIcon value='numbered-list' size='16' color='#fa4b2a'></AtIcon>
          <Text className='tag'>{current+1}</Text>/6
        </View>
      </View>
    )
  }
}

export default Status
