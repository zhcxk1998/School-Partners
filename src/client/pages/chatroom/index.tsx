import React, { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Input, Image } from '@tarojs/components'
import { AtActivityIndicator } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'

import chatroomStore from '../../store/chatroomStore'

import './index.scss'

interface IProps {
  chatroomStore: chatroomStore
}

interface IState {
  value: string,
  scrollAnimation: boolean,
  emojiOpened: boolean
}

@inject('chatroomStore')
@observer
class ChatRoom extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '聊天室',
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
      scrollAnimation: false,
      emojiOpened: false
    }
  }

  componentWillMount() {
    const { title, to } = this.$router.params
    const { chatroomStore: { setLatestScrollViewId } } = this.props
    /* 加载记录无需动画，直接跳转到最新消息 */
    setLatestScrollViewId(to)
    Taro.setNavigationBarTitle({
      title
    })
  }

  componentDidShow() {
    /* 添加消息发送滚动动画 */
    this.setState({
      scrollAnimation: true
    })
  }

  onMessageSend(): void {
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
    this.resetInput()
  }

  handleChange({ detail: { value } }: { detail: { value: string } }): void {
    this.setState({ value })
  }

  handleEmojiOpen(): void {
    this.setState({ emojiOpened: !this.state.emojiOpened })
  }

  resetInput(): void {
    this.setState({
      value: ''
    })
  }

  render() {
    const { chatroomStore: { messageList, scrollViewId, userName, isReconnected } } = this.props
    const { value, scrollAnimation, emojiOpened } = this.state
    const { to } = this.$router.params
    return (
      <View className='chat'>
        <View hidden={!isReconnected}>
          <AtActivityIndicator mode='center' content='重连中...' size={36}></AtActivityIndicator>
        </View>
        <ScrollView
          className={`chat-message-container ${emojiOpened ? 'emoji-open' : ''}`}
          scrollY
          scrollWithAnimation={scrollAnimation}
          scrollIntoView={scrollViewId}
        >
          {messageList[to] && messageList[to].map(messageInfo => {
            const { message, messageId, currentTime, userAvatar, isMyself } = messageInfo
            return (
              <View className={`message-wrap ${isMyself || messageInfo.userName === userName ? 'myself' : ''}`} id={messageId} key={messageId}>
                <Image className='avatar' src={userAvatar} />
                <View className='info'>
                  <View className='header'>
                    <View className='username'>
                      {messageInfo.userName}
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
        <View className={`chat-input-container ${emojiOpened ? 'emoji-open' : ''}`}>
          <View className='chat-input-wrap'>
            <Image className='emoji' src='http://cdn.algbb.cn/chatroom/emoji.png' onClick={this.handleEmojiOpen.bind(this)} />
            <Input className='input' type='text' value={value} onInput={this.handleChange.bind(this)} placeholder='来吹吹水吧~' cursorSpacing={10} confirmType='send' />
            <View className='button' onClick={this.onMessageSend.bind(this)} >发送</View>
          </View>
          <ScrollView scrollY className='emoji-container'>
            {Array.from({ length: 33 }).map((_, index) => {
              const imgSrc = `http://cdn.algbb.cn/emoji/${(index + 1).toString().padStart(2, '0')}.png`
              return (
                <Image className='emoji' key={index} src={imgSrc} />
              )
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ChatRoom as ComponentType
