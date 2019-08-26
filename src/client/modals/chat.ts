export interface SendMessageInfo {
  type: string,
  to: string,
  message: string,
  socketId: string
}

export interface LoginInfo {
  type: string,
  socketId: string,
  userName: string,
  userAvatar: string,
}

export interface ReceiveMessageInfo {
  socketId: string,
  currentTime: string,
  message: string,
  messageId: string,
  userName: string
  userAvatar: string,
}

// export interface MessageList extends Array<ReceiveMessageInfo> {
//   [index: number]: ReceiveMessageInfo,
// }

// export type MessageList = ReceiveMessageInfo[]