import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
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

  onMessageSend() {
    const { chatroomStore: { handleMessageSend, socketId } } = this.props
    const { value } = this.state;
    const { to } = this.$router.params
    if (value === '') return

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
    const { chatroomStore: { messageList, scrollViewId, userName } } = this.props
    const { value } = this.state
    const { to } = this.$router.params
    return (
      <View>
        <ScrollView
          className='chat-message-container'
          scrollY
          scrollWithAnimation
          scrollIntoView={scrollViewId}
          style={{ height: 'calc(100vh - 16vw)' }}
        >
          {messageList[to] && messageList[to].map(messageInfo => {
            const { message, messageId, currentTime, userName, userAvatar, isMyself } = messageInfo
            return (
              <View className={`message-wrap ${isMyself || messageInfo.userName === userName ? 'myself' : ''}`} id={messageId} key={messageId}>
                <Image className='avatar' src={userAvatar} />
                <View className='info'>
                  <View className='header'>
                    <View className='username'>
                      {userName}
                    </View>
                    <View className='time'>
                      {currentTime}
                    </View>
                  </View>
                  <View className='content'>
                    {message}
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
        <View className='chat-input-wrap'>
          <Image className='emoji' src='http://cdn.algbb.cn/chatroom/emoji.png'></Image>
          <Input className='input' type='text' value={value} onInput={this.handleChange.bind(this)} placeholder='来吹吹水吧~' />
          <View className='button' onClick={this.onMessageSend.bind(this)} >发送</View>
        </View>
      </View>
    )
  }
}

export default ChatRoom as ComponentType
