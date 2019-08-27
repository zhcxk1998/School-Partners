import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import chatroomStore from '../../store/chatroomStore'

import './index.scss'

interface IProps {
  chatroomStore: chatroomStore
}

interface IState {
  value: string,
}

@inject('chatroomStore')
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
      value: ''
    }
  }

  async componentWillMount() {
    const { title } = this.$router.params
    Taro.setNavigationBarTitle({
      title
    })
  }

  handleMessageSend() {
    const { chatroomStore: { handleMessageSend, socketId } } = this.props
    const { value } = this.state;
    const { to } = this.$router.params
    handleMessageSend({
      type: 'text',
      from: socketId,
      to,
      message: value
    })
    this.setState({
      value: ''
    })
  }

  handleChange({ detail: { value } }) {
    this.setState({ value })
  }

  render() {
    const { chatroomStore: { messageList, scrollViewId } } = this.props
    const { value } = this.state
    const { to } = this.$router.params
    return (
      <View>
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: '100px' }}
          scrollIntoView={scrollViewId}
        >
          {messageList[to] && messageList[to].map(messageInfo => {
            const { message, messageId } = messageInfo
            return <View id={messageId} key={messageId}>{message}</View>
          })}
        </ScrollView>
        <Input type='text' value={value} onInput={this.handleChange.bind(this)} />
        <Button type='primary' onClick={this.handleMessageSend.bind(this)}>send</Button>
      </View>
    )
  }
}

export default ChatRoom as ComponentType
