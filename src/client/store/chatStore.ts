import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { MessageInfo,LoginInfo } from '../modals/chat'

class chatStore {
  @observable socketTask: any = null
  @observable socketId: string = ''
  @observable userName: string = ''
  @observable userAvatar: string = ''

  @observable messageList: Array<string> = []

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
      this.messageList.push(data)
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
    const messageInfo: MessageInfo = {
      type,
      to,
      message
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