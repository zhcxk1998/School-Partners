import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import studyStore from '../../store/studyStore'
import chatStore from '../../store/chatStore'

import Study from '../study/index'
import ChatRoom from '../chatroom/index'
import DashBoard from '../dashboard';
import Tabbar from '../../components/Tabbar/index'

import './index.scss'


interface IProps {
  studyStore: studyStore,
  chatStore: chatStore
}

interface IState {
  count: number,
  current: number,
}

@inject('studyStore','chatStore')
@observer
class Index extends Component<IProps, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true, // 允许下拉加载
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      current: 0,
    }
  }

  async componentDidMount() {
    const { chatStore: { socketConnect } } = this.props
    socketConnect()
  }

  onReachBottom() {
    /* 触摸底部加载更多题库 */
  }

  async onPullDownRefresh() {
    /* 下拉刷新课程、题库列表 */
    Taro.showNavigationBarLoading()
    Taro.showLoading({ title: '刷新中...' })
    const { studyStore: { getCourseList, getExerciseList } } = this.props;
    await getCourseList()
    await getExerciseList()
    Taro.hideLoading()
    Taro.hideNavigationBarLoading()
    Taro.stopPullDownRefresh()
  }

  switchTab(index: number): void {
    this.setState({ current: index })
  }

  render() {
    const { current } = this.state;
    return (
      <View className='index-container'>
        {current === 0 ? <Study />
          : current === 1 ? <ChatRoom />
            : current === 3 ? <DashBoard />
              : null}
        <Tabbar onSwitchTab={this.switchTab.bind(this)} current={current} />
      </View>
    )
  }
}

export default Index as ComponentType
