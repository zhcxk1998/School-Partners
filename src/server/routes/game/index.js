const generateTime = require('../../utils/generateTime')
const {
  query
} = require('../../utils/query')
const {
  QUERY_TABLE
} = require('../../utils/sql');
const parse = require('../../utils/parse')

const onlineUserSocket = {}
const onlineUserInfo = {}
const matchQueue = []
const gameRoom = {}

let topicList = []

// const topicList = [
//   [{
//     id: 1,
//     topicContent: '我是题目1',
//     correctAnswer: 0,
//     optionList: [{
//       id: 1,
//       option: '我是选项1'
//     }, {
//       id: 2,
//       option: '我是选项2'
//     }, {
//       id: 3,
//       option: '我是选项3'
//     }, {
//       id: 4,
//       option: '我是选项4'
//     }]
//   }, {
//     id: 2,
//     topicContent: '我是题目2',
//     correctAnswer: 1,
//     optionList: [{
//       id: 1,
//       option: '我是选项1'
//     }, {
//       id: 2,
//       option: '我是选项2'
//     }, {
//       id: 3,
//       option: '我是选项3'
//     }, {
//       id: 4,
//       option: '我是选项4'
//     }]
//   }],
//   [{
//     id: 1,
//     topicContent: '我是题目3',
//     correctAnswer: 2,
//     optionList: [{
//       id: 1,
//       option: '我是选项1'
//     }, {
//       id: 2,
//       option: '我是选项2'
//     }, {
//       id: 3,
//       option: '我是选项3'
//     }, {
//       id: 4,
//       option: '我是选项4'
//     }]
//   }, {
//     id: 2,
//     topicContent: '我是题目4',
//     correctAnswer: 3,
//     optionList: [{
//       id: 1,
//       option: '我是选项1'
//     }, {
//       id: 2,
//       option: '我是选项2'
//     }, {
//       id: 3,
//       option: '我是选项3'
//     }, {
//       id: 4,
//       option: '我是选项4'
//     }]
//   }]
// ]

// 广播消息
const broadcast = (message) => {
  // const {
  //   from,
  //   userName,
  //   openid
  // } = message
  Object.values(onlineUserSocket).forEach((socket) => {
    socket.send(JSON.stringify({
      ...message,
      // isMyself: userName === onlineUserInfo[socket.socketId].userName
      // isMyself: openid === onlineUserInfo[socket.socketId].openid
    }))
  })
}

const handleLogin = (ws, socketMessage) => {
  const {
    socketId,
    userName,
    userAvatar,
    openid
  } = socketMessage

  console.log(socketMessage)

  onlineUserSocket[socketId] = ws
  onlineUserInfo[socketId] = {
    userName,
    userAvatar,
    openid
  }
  ws.socketId = socketId
  console.log('game login\n\n\n\n')
  console.log('|---------------------------------------------------\n')
  console.log(Object.keys(onlineUserSocket).length + '人在线')
  console.log(onlineUserInfo)
  console.log('\n|---------------------------------------------------\n\n')

  const topicId = Math.floor(Math.random() * Object.keys(topicList).length)
  console.log(topicId)

  broadcast({
    type: 'system',
    count: Object.keys(onlineUserSocket).length,
  })
}

const handleLogout = (socketId) => {
  if (!socketId) return

  const roomId = onlineUserInfo[socketId]['roomId'] || '-1'

  /* 如果当前在房间里，则发通知并删除房间 */
  if (roomId !== '-1') {
    Object.keys(gameRoom[roomId]).forEach(id => {
      onlineUserSocket[id].send(JSON.stringify({
        status: false,
        type: 'close',
        msg: '房间已关闭',
        socketId: id
      }))

      /* 清除在线用户信息中的房间号 */
      delete onlineUserInfo[id]['roomId']
    })

    delete gameRoom[roomId]
  }

  matchQueue.splice(matchQueue.indexOf(item => item.socketId === socketId), 1)

  delete onlineUserSocket[socketId]
  delete onlineUserInfo[socketId]
  console.log('game logout\n\n\n\n')
  console.log('|---------------------------------------------------\n')
  console.log(Object.keys(onlineUserSocket).length + '人在线')
  console.log(onlineUserInfo)
  console.log('\n---------------------------------------------------\n\n')

  broadcast({
    type: 'system',
    count: Object.keys(onlineUserSocket).length
  })
}

const handleMatch = (ws, socketMessage) => {
  const {
    socketId,
  } = socketMessage

  const {
    userName,
    userAvatar,
    openid,
    score
  } = onlineUserInfo[socketId]

  matchQueue.push({
    openid,
    socketId,
    userName,
    userAvatar,
    score
  })

  console.log('匹配队列')
  console.log(matchQueue)

  if (matchQueue.length >= 2) {
    const gamer1 = matchQueue.shift()
    const gamer2 = matchQueue.shift()

    const socketId1 = gamer1.socketId
    const socketId2 = gamer2.socketId


    /* 生成房间id */
    const roomId = Math.random().toFixed(5) + ''

    gameRoom[roomId] = {
      [socketId1]: {
        status: false
      },
      [socketId2]: {
        status: false
      }
    }

    onlineUserInfo[socketId1]['roomId'] = roomId
    onlineUserInfo[socketId2]['roomId'] = roomId

    onlineUserSocket[socketId1].send(JSON.stringify({
      roomId,
      socketId: socketId1,
      msg: '匹配成功',
      type: 'match',
      otherUser: socketId2,
      otherUserName: onlineUserInfo[socketId2].userName,
      otherUserAvatar: onlineUserInfo[socketId2].userAvatar
    }))
    onlineUserSocket[socketId2].send(JSON.stringify({
      roomId,
      socketId: socketId2,
      msg: '匹配成功',
      type: 'match',
      otherUser: socketId1,
      otherUserName: onlineUserInfo[socketId1].userName,
      otherUserAvatar: onlineUserInfo[socketId1].userAvatar
    }))
  }
}

const shuffle = (arr) => {
  let len = arr.length
  while (len > 1) {
    let index = Math.floor(Math.random() * len--);
    [arr[index], arr[len]] = [arr[len], arr[index]]
  }
  return arr
}

const getGameTopicList = async () => {
  const response = []
  const res = await query(QUERY_TABLE('exercise_list'));

  /* 找出全部题目，进行单选题筛选 */
  res.map((item, index) => {
    const {
      topic_list
    } = item


    // response[index] = {
    //   topicList: topic_list
    // }


    response.push(...JSON.parse(topic_list))

  })


  /* 筛选出单选题 */
  // const exerciseList = parse(response)[Math.floor(Math.random() * response.length)].topicList.filter(item => item.topicType === 1)
  const singleExerciseList = response.filter(item => item.topicType === 1)
  const exerciseList = shuffle(singleExerciseList).slice(0, 5)

  const gameTopicList = exerciseList.map((item, index) => {
    const {
      topicContent = '', topicAnswer = [], topicOptions = []
    } = item
    return {
      id: index + 1,
      topicContent,
      correctAnswer: topicAnswer[0],
      optionList: topicOptions
    }
  })

  topicList = [...gameTopicList]

  return gameTopicList
}

getGameTopicList()

const handleGameReady = async (ws, socketMessage) => {
  const {
    roomId,
    socketId
  } = socketMessage

  console.log(roomId, socketId)

  if (!roomId) return
  gameRoom[roomId][socketId]['status'] = true

  /* 全部准备好就开始 */
  if (Object.values(gameRoom[roomId]).every(item => item.status)) {
    console.log(roomId, gameRoom[roomId])
    // const topicId = Math.floor(Math.random() * Object.keys(topicList).length)

    const gameTopicList = await getGameTopicList()

    Object.keys(gameRoom[roomId]).forEach(id => {
      onlineUserSocket[id].send(JSON.stringify({
        status: true,
        msg: '游戏开始',
        socketId: id,
        type: 'ready',
        topicId: 1,
        topicList: gameTopicList
      }))
    })
  }
}

const handleAnswer = (ws, socketMessage) => {
  console.log(socketMessage)

  const {
    roomId,
    socketId,
    data = {}
  } = socketMessage

  console.log(socketMessage)

  const {
    currentTopicId,
    answerUser,
    answerContent,
    topicId
  } = data

  gameRoom[roomId][socketId]['answer'] = true

  const correctAnswer = topicList[currentTopicId].correctAnswer
  const isCorrect = correctAnswer === answerContent

  const isNext = Object.values(gameRoom[roomId]).every(item => item.answer) || isCorrect

  const isFinish = (currentTopicId === topicList.length - 1) && isNext

  console.log(correctAnswer, answerContent, isCorrect)

  Object.keys(gameRoom[roomId]).forEach(id => {
    onlineUserSocket[id].send(JSON.stringify({
      roomId,
      socketId: id,
      answerUser,
      userName: onlineUserInfo[answerUser].userName,
      userAvatar: onlineUserInfo[answerUser].userAvatar,
      answerContent,
      currentTopicId,
      type: 'answer',
      /* 默认2题结束 */
      isFinish,
      isNext: isCorrect || isNext,
      isCorrect,
      correctAnswer
    }))
  })

  if (isNext) {
    Object.keys(gameRoom[roomId]).forEach(id => {
      gameRoom[roomId][id]['answer'] = false
    })
  }
}

const handleTextMessage = async (ws, socketMessage) => {
  const {
    to,
    message,
    from
  } = socketMessage
  const {
    userName,
    userAvatar,
    openid
  } = onlineUserInfo[ws.socketId]
  const currentTime = generateTime()
  const messageId = `msg${new Date().getTime()}${Math.ceil(Math.random() * 100)}`
  console.log({
    room_name: to,
    user_name: userName,
    user_avatar: userAvatar,
    current_time: currentTime,
    message,
    openid
  })
  broadcast({
    ...onlineUserInfo[ws.socketId],
    currentTime,
    message,
    messageId,
    from,
    to,
    openid
  })
}

const handleHeartCheck = (ws, socketMessage) => {
  ws.send(JSON.stringify({
    data: 'pong'
  }))
}

const game = (ctx) => {
  const ws = ctx.websocket;
  ws.on('message', (socketMessage) => {
    socketMessage = JSON.parse(socketMessage)
    const {
      type
    } = socketMessage
    switch (type) {
      case 'login':
        handleLogin(ws, socketMessage)
        break;
      case 'logout':

        break;
      case 'system':

        break;
      case 'match':
        handleMatch(ws, socketMessage)
        break;
      case 'ready':
        handleGameReady(ws, socketMessage)
        break;
      case 'answer':
        handleAnswer(ws, socketMessage)
        break;
      case 'text':
        handleTextMessage(ws, socketMessage)
        break;
      case 'image':

        break;
      case 'check':
        handleHeartCheck(ws, socketMessage)
        break;
      default:
        break;
    }
  })
  ws.on('close', (msg) => {
    handleLogout(ws.socketId)
  })
}

module.exports = () => (
  game
)
