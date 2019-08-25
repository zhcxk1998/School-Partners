let onlineUserSocket = {}
let onlineUserInfo = {}

// 广播消息
const broadcast = (message) => {
  Object.values(onlineUserSocket).forEach((socket) => {
    socket.send(message)
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

const handleTextMessage = (ws, socketMessage) => {
  const { to, message } = socketMessage
  if (to === 'all') {
    // 群发
    broadcast(message)
  } else {
    // 私发
    ws.send(message)
    onlineUserSocket[to].send(message)
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
