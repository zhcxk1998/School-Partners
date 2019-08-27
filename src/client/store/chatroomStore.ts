import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

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
    socketTask.onMessage(({ data }) => {
      const messageInfo: ReceiveMessageInfo = JSON.parse(data)
      const { to, messageId, isMyself, userName, currentTime, message } = messageInfo
      this.messageList[to].push(messageInfo)
      /* 设置群组最新消息 */
      this.contactsList.filter(contacts => contacts.contactsId === to)[0].latestMessage = {
        userName, message, currentTime
      }
      this.scrollViewId = isMyself ? messageId : ''
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

  // async setMessageList() {
  //   return new Promise((resolve, reject) => {

  //     resolve()
  //   })
  // }

  async setContactsList() {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'http://localhost:3000/contacts',
        method: 'GET'
      })
      /* 初始化消息列表 */
      data.forEach(contactsInfo => {
        this.messageList[contactsInfo.contactsId] = []
      })

      /* 初始化群组信息 */
      this.contactsList = data.map(contactsInfo => {
        const { contactsId } = contactsInfo
        const contactsMessageList = this.messageList[contactsId]
        /* 设定最新消息 */
        const { userName, message, currentTime } = contactsMessageList[contactsMessageList.length - 1]
          && contactsMessageList[contactsMessageList.length - 1]
          || { userName: '无', message: '...', currentTime: '00:00' }
        return {
          ...contactsInfo,
          latestMessage: {
            userName,
            currentTime,
            message
          }
        }
      })
      resolve()
    })
  }

  @action.bound
  handleMessageSend(messageInfo: SendMessageInfo): void {
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
    await this.setContactsList()
    this.socketTask = await Taro.connectSocket({
      url: 'ws://localhost:3000',
    })
    this.handleSocketOpen()
    this.handleSocketMessage()
    this.handleSocketClose()
    this.handleSocketError()
  }
}

export default chatroomStore