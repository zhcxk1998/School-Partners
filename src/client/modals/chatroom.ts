/* 消息部分 */
export interface LoginInfo {
  type: string,
  socketId: string,
  userName: string,
  userAvatar: string,
}

export interface SendMessageInfo {
  type: string,
  from: string
  to: string,
  message: string,
}

export interface ReceiveMessageInfo {
  from: string,
  to: string,
  currentTime: string,
  message: string,
  messageId: string,
  userName: string
  userAvatar: string,
  isMyself: boolean,
}

export interface MessageList {
  [key: string]: ReceiveMessageInfo[]
}

/* 联系人部分 */

export interface ContactsInfo {
  title: string,
  avatar: string,
  latestMessage: {
    userName: string,
    message: string,
    currentTime: string
  },
  contactsId: string
}