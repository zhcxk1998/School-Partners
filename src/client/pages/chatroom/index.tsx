import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import chatStore from '../../store/chatStore'

import './index.scss'

interface IProps {
  chatStore: chatStore
}

interface IState {
  count: number
}

@inject('chatStore')
@observer
class ChatRoom extends Component<IProps, IState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '聊天室',
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  async componentWillMount() {

  }

  async handleMessageSend() {
    const { chatStore: { handleMessageSend } } = this.props
    handleMessageSend('text', 'all', this.state.count + '')
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { chatStore: { messageList } } = this.props
    return (
      <View>
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: '300px' }}
          scrollIntoView={'a10'}
        >
          {messageList.slice().map((message, index) => {
            return <View id={'a' + index} key={index}>{message}</View>
          })}
        </ScrollView>

        <Button type='primary' onClick={this.handleMessageSend.bind(this)}>send</Button>
      </View>
    )
  }
}

export default ChatRoom as ComponentType
