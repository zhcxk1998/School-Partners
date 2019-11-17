import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'


import './index.scss'

interface IProps {

}

@inject('infoStore')
@observer
class FeatureList extends Component<IProps, {}> {
  navigateTo(link: string, feature: string): void {
    Taro.navigateTo({ url: `${link}?title=${feature}` })
  }

  render() {
    const featureList: Array<{ icon: string, feature: string, link: string }> = [
      { icon: 'http://cdn.algbb.cn/dashboard/history.png', feature: '历史足迹', link: '' },
      { icon: 'http://cdn.algbb.cn/dashboard/forums.png', feature: '我的帖子', link: '/client/pages/myForums/index' },
      { icon: 'http://cdn.algbb.cn/dashboard/heart.png', feature: '我的订阅', link: '' },
      { icon: 'http://cdn.algbb.cn/dashboard/star.png', feature: '我的收藏', link: '' },
      { icon: 'http://cdn.algbb.cn/dashboard/score.png', feature: '我的成绩', link: '' },
      { icon: 'http://cdn.algbb.cn/dashboard/setting.png', feature: '设置中心', link: '' },
    ]
    return (
      <View className='feature-list-container'>
        {featureList.map((item, index) => {
          const { icon, feature, link } = item
          return (
            <View className='feature-list-wrap' key={index} onClick={() => { this.navigateTo(link, feature) }}>
              <Image className='icon' src={icon} />
              <View className='feature'>{feature}</View>
              <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
            </View>
          )
        })}
      </View>
    )
  }
}

export default FeatureList
