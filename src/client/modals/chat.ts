export interface MessageInfo {
  type: string,
  to: string,
  message: string
}

export interface LoginInfo {
  type: string,
  socketId: string,
  userName: string,
  userAvatar: string,
}