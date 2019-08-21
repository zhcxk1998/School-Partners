import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import infoStore from '../../store/infoStore'

import './index.scss'


interface IProps {
  infoStore: infoStore
}

interface IState {
  isLoading: boolean
}

@inject('infoStore')
@observer
class DashBoard extends Component<IProps, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心',
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  async componentWillMount() {
    const { infoStore: { getUserInfo } } = this.props
    Taro.showLoading({
      title: '加载中...'
    })
    await getUserInfo()
    this.setState({ isLoading: false })
    Taro.hideLoading()
  }

  render() {
    const { infoStore: { userInfo } } = this.props
    const { avatarUrl, nickName } = userInfo
    const { isLoading } = this.state
    return !isLoading ? (
      <View className='dashboard-container'>
        <View className='information-container'>
          <View className='information-wrap'>
            <Image className='avatar' src={avatarUrl} lazyLoad></Image>
            <View className='nickname'>
              <View>{nickName}</View>
              <View className='tag'>北京师范大学珠海分校的一名小菜鸡</View>
            </View>
            <View className='status'>
              <View className='status-wrap'>
                <View className='amount'>
                  4
                </View>
                <View>通过课程</View>
              </View>
              <View className='status-wrap'>
                <View className='amount'>
                  3
                </View>
                <View>完成题库</View>
              </View>
              <View className='status-wrap'>
                <View className='amount'>
                  12
                </View>
                <View>收藏</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    ) : null
  }
}

export default DashBoard as ComponentType
