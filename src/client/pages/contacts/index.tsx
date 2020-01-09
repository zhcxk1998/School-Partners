import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import chatroomStore from '../../store/chatroomStore'

import './index.scss'

interface IProps {
  chatroomStore: chatroomStore
}

interface IState {
}

@inject('chatroomStore')
@observer
class Contacts extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  async componentWillMount() {
    
  }

  handleGroupClick(contactsId: string, title: string): void {
    Taro.navigateTo({
      url: `/pages/chatroom/index?to=${contactsId}&title=${title}`
    })
  }

  render() {
    const { chatroomStore: { contactsList } } = this.props
    return (
      <View className='contacts-container'>
        {contactsList.map((contactsInfo, index) => {
          const { title, avatar, contactsId, latestMessage } = contactsInfo
          const { userName, currentTime, message } = latestMessage
          return (
            <View className='contacts-wrap' key={index} onClick={this.handleGroupClick.bind(this, contactsId, title)}>
              <Image className='avatar' src={avatar} />
              <View className='info'>
                <View className='header'>
                  <View className='title'>{title}</View>
                  <View className='time'>{currentTime}</View>
                </View>
                <View className='content'>{userName}: {message}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default Contacts as ComponentType