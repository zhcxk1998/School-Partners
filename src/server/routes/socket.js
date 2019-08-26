const generateTime = require('../utils/generateTime')

let onlineUserSocket = {}
let onlineUserInfo = {}

// 广播消息
const broadcast = (message) => {
  const { socketId } = message
  Object.values(onlineUserSocket).forEach((socket) => {
    socket.send(JSON.stringify({
      ...message,
      isMyself: socketId === socket.socketId
    }))
  })
}

const handleLogin = (ws, socketMessage) => {
  const { socketId, userName, userAvatar } = socketMessage
  onlineUserSocket[socketId] = ws
  onlineUserInfo[socketId] = { userName, userAvatar }
  ws.socketId = socketId
  console.log('|---------------------------------------------------\n')
  console.log(Object.keys(onlineUserSocket).length + '人在线')
  console.log(onlineUserInfo)
  console.log('\n|---------------------------------------------------\n\n')
}

const handleLogout = (socketId) => {
  delete onlineUserSocket[socketId]
  delete onlineUserInfo[socketId]
  console.log('|---------------------------------------------------\n')
  console.log(Object.keys(onlineUserSocket).length + '人在线')
  console.log(onlineUserInfo)
  console.log('\n---------------------------------------------------\n\n')
}

/* 要处理离线用户消息发送的问题（找不到此用户的id，导致报错） */
const handleTextMessage = (ws, socketMessage) => {
  const { to, message, socketId } = socketMessage
  const currentTime = generateTime()
  const messageId = `msg${message}${new Date().getTime()}`
  if (to === 'all') {
    // 群发
    broadcast({
      ...onlineUserInfo[ws.socketId],
      currentTime,
      message,
      messageId,
      socketId: ws.socketId,
    })
  } else {
    const isMyself = socketId === ws.socketId

    /* 为自己发送信息 */
    ws.send(JSON.stringify({
      ...onlineUserInfo[ws.socketId],
      currentTime,
      message,
      messageId,
      socketId: ws.socketId,
      isMyself
    }))

    /* 为对方发送信息 */
    onlineUserSocket[to].send(JSON.stringify({
      ...onlineUserInfo[ws.socketId],
      currentTime,
      message,
      messageId,
      socketId: ws.socketId,
      isMyself
    }))
  }
}

const websocket = (ctx) => {
  const ws = ctx.websocket;
  ws.on('message', (socketMessage) => {
    socketMessage = JSON.parse(socketMessage)
    const { type } = socketMessage
    switch (type) {
      case 'login':
        handleLogin(ws, socketMessage)
        break;
      case 'logout':

        break;
      case 'system':

        break;
      case 'text':
        handleTextMessage(ws, socketMessage)
        break;
      case 'image':

        break;
      default:
        break;
    }
  })
  ws.on('close', (msg) => {
    handleLogout(ws.socketId)
  })
}

module.exports = websocket
