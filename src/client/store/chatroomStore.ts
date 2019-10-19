import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import formatTime from '../utils/formatTime'

import { SendMessageInfo, ReceiveMessageInfo, LoginInfo, MessageList, ContactsInfo } from '../modals/chatroom'

class chatroomStore {
  /* socket部分 */
  @observable socketTask: any = null
  @observable socketId: string = ''
  @observable userName: string = ''
  @observable userAvatar: string = ''

  /* 消息部分 */
  @observable messageList: MessageList = {}
  @observable scrollViewId: string = ''

  /* 联系人部分 */
  @observable contactsList: ContactsInfo[] = []

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
    socketTask.onMessage(async ({ data }) => {
      const messageInfo: ReceiveMessageInfo = JSON.parse(data)
      const { to, messageId, isMyself, userName, userAvatar, currentTime, message } = messageInfo
      const time: string = formatTime(currentTime)

      this.messageList[to].push({
        ...messageInfo,
        currentTime: time
      })
      /* 设置群组最新消息 */
      this.contactsList.filter(contacts => contacts.contactsId === to)[0].latestMessage = {
        userName, message, currentTime: time
      }
      this.scrollViewId = isMyself ? messageId : ''
      await Taro.request({
        url: 'http://localhost:3000/chatlog',
        method: 'PUT',
        data: {
          to,
          userName,
          userAvatar,
          currentTime,
          message,
        }
      })
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

  async setMessageList(contacts: ContactsInfo[]): Promise<any> {
    await Promise.all(contacts.map(async contactInfo => {
      const { contactsId } = contactInfo
      const { data } = await Taro.request({
        url: `http://localhost:3000/chatlog/${contactsId}`,
        method: 'GET'
      })
      this.messageList[contactsId] = data
    }))
  }

  async setContactsList() {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'http://localhost:3000/contacts',
        method: 'GET'
      })
      this.contactsList = data
      this.setMessageList(data)
      resolve()
    })
  }

  @action.bound
  handleMessageSend(messageInfo: SendMessageInfo): void {
    const socketTask: any = this.socketTask
    socketTask.send({ data: JSON.stringify(messageInfo) })
  }

  @action.bound
  setLatestScrollViewId(to: string) {
    const messageInfo = this.messageList[to]
    const { messageId } = messageInfo[messageInfo.length - 1]
    this.scrollViewId = messageId
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
    await this.setContactsList()
    this.socketTask = await Taro.connectSocket({
      url: 'ws://localhost:3000',
      // url:'wss://www.algbb.cn'
    })
    this.handleSocketOpen()
    this.handleSocketMessage()
    this.handleSocketClose()
    this.handleSocketError()
  }
}

export default chatroomStore