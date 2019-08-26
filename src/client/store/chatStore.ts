import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { SendMessageInfo, ReceiveMessageInfo, LoginInfo } from '../modals/chat'

class chatStore {
  @observable socketTask: any = null
  @observable socketId: string = ''
  @observable userName: string = ''
  @observable userAvatar: string = ''

  @observable messageList: ReceiveMessageInfo[] = []
  @observable scrollViewId: string = ''

  generateSocketId(): void {
    this.socketId = new Date().getTime() + '' + Math.ceil(Math.random() * 100)
  }

  handleSocketOpen(): void {
    const loginInfo: LoginInfo = {
      type: 'login',
      socketId: this.socketId,
      userName: this.userName,
      userAvatar: this.userAvatar,
    }
    const socketTask: any = this.socketTask
    socketTask.onOpen(function () {
      socketTask.send({ data: JSON.stringify(loginInfo) })
    })
  }

  handleSocketMessage(): void {
    const socketTask: any = this.socketTask
    socketTask.onMessage(({ data }) => {
      const messageInfo: ReceiveMessageInfo = JSON.parse(data)
      this.messageList.push(messageInfo)
      console.log(messageInfo)
      this.scrollViewId = messageInfo.messageId
    })
  }

  handleSocketClose(): void {
    const socketTask: any = this.socketTask
    socketTask.onClose(function (msg) {
      console.log('onClose: ', msg)
    })
  }

  handleSocketError(): void {
    const socketTask: any = this.socketTask
    socketTask.onError(function () {
      console.log('Error!')
    })
  }

  @action.bound
  handleMessageSend(type: string = 'text', to: string = 'all', message: string) {
    const messageInfo: SendMessageInfo = {
      type,
      to,
      message,
      socketId: this.socketId
    }
    const socketTask: any = this.socketTask
    socketTask.send({ data: JSON.stringify(messageInfo) })
  }

  @action.bound
  setUserInfo() {
    return new Promise(async (resolve, reject) => {
      const { userInfo: { nickName, avatarUrl } } = await Taro.getUserInfo()
      this.userName = nickName
      this.userAvatar = avatarUrl
      resolve()
    })
  }

  @action.bound
  async socketConnect() {
    this.generateSocketId()
    await this.setUserInfo()
    this.socketTask = await Taro.connectSocket({
      url: 'ws://localhost:3000',
    })
    this.handleSocketOpen()
    this.handleSocketMessage()
    this.handleSocketClose()
    this.handleSocketError()
  }
}

export default chatStore