import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import PersonalInfo from '../../components/DashBoard/PersonalInfo/index'
import Recoomend from '../../components/DashBoard/Recommend/index'
import FeatureList from '../../components/DashBoard/FeatureList/index'

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
    const { infoStore: { handleUserLogin, getUserInfo } } = this.props
    Taro.showLoading({
      title: '加载中...'
    })
    await handleUserLogin()
    await getUserInfo()
    this.setState({ isLoading: false })
    Taro.hideLoading()
  }

  render() {
    const { isLoading } = this.state
    return !isLoading ? (
      <View className='dashboard-container'>
        <PersonalInfo infoStore={new infoStore()} />
        <Recoomend />
        <FeatureList />
      </View>
    ) : <Button openType='getUserInfo' >点击登录</Button>
  }
}

export default DashBoard as ComponentType
