import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'


import './index.scss'

interface IProps {

}

@inject('infoStore')
@observer
class FeatureList extends Component<IProps, {}> {
  render() {
    return (
      <View className='feature-list-container'>
        <View className='feature-list-wrap'>
          <Image className='icon' src='http://cdn.algbb.cn/dashboard/history.png' />
          <View className='feature'>历史足迹</View>
          <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
        </View>
        <View className='feature-list-wrap'>
          <Image className='icon' src='http://cdn.algbb.cn/dashboard/heart.png' />
          <View className='feature'>我的订阅</View>
          <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
        </View>
        <View className='feature-list-wrap'>
          <Image className='icon' src='http://cdn.algbb.cn/dashboard/star.png' />
          <View className='feature'>我的收藏</View>
          <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
        </View>
        <View className='feature-list-wrap'>
          <Image className='icon' src='http://cdn.algbb.cn/dashboard/score.png' />
          <View className='feature'>我的成绩</View>
          <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
        </View>
        <View className='feature-list-wrap'>
          <Image className='icon' src='http://cdn.algbb.cn/dashboard/setting.png' />
          <View className='feature'>设置中心</View>
          <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
        </View>
      </View>
    )
  }
}

export default FeatureList
