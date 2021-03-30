import React, { ComponentType } from 'react'
import Taro, { FC, MutableRefObject, useEffect, useRef, useState } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'

const config = require('../../config/common')

const { socketUrl } = config

import './index.scss'
import { TopicAnswerRules } from '@/admin/pages/ExamModify/formValidate'

interface IProps {

}

type UserInfo = {
  userName: string,
  userAvatar: string,
  score: number
}

const WRONG_ANSWER: number = -1
const NORMAL_ANSWER: number = 0
const CORRECT_ANSWER: number = 1

const Game: FC<IProps> = (props: IProps) => {
  const [isMyself, setIsMyself] = useState<boolean>(false)
  const [isMatching, setIsMatching] = useState<boolean>(false)
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false)

  const [leftUser, setLeftUser] = useState<UserInfo>({ userName: '', userAvatar: '', score: 0 })
  const [rightUser, setRightUser] = useState<UserInfo>({ userName: '', userAvatar: '', score: 0 })

  const [answerUser, setAnswerUser] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')
  const [onlineUserCount, setOnlineUserCount] = useState<number>(0)
  const [currentTopicId, setCurrentTopicId] = useState<number>(0)
  const [currentOptionId, setCurrentOptionId] = useState<number>(-1)
  const [topicId, setTopicId] = useState<number>(0)

  const [answerStatus, setAnswerStatus] = useState<any[]>([
    { status: 0, answerUser: 0 },
    { status: 0, answerUser: 0 },
    { status: 0, answerUser: 0 },
    { status: 0, answerUser: 0 }
  ])
  const [topicList, setTopicList] = useState<any[]>([])
  const socketTaskRef: MutableRefObject<any> = useRef(null)
  const socketIdRef: MutableRefObject<number> = useRef(-1)
  const otherSocketIdRef: MutableRefObject<number> = useRef(-1)
  const roomIdRef: MutableRefObject<string> = useRef('')
  const userInfoRef: MutableRefObject<object> = useRef({})
  const topicListRef: MutableRefObject<any[]> = useRef([])
  const currentTopicIdRef: MutableRefObject<number> = useRef(0)




  useEffect(() => {
    Taro.connectSocket({
      url: socketUrl
    }).then(task => {
      socketTaskRef.current = task

      handleSocketOpen()
      handleSocketMessage()
    })

    return () => {
      socketTaskRef.current.close()
    }
  }, [])


  // useEffect(() => {
  //   setLeftUser({
  //     userName: '123',
  //     userAvatar: '',
  //     score: 0
  //   })
  //   setRightUser({
  //     userName: '123',
  //     userAvatar: '',
  //     score: 0
  //   })
  //   setIsMatch(true)
  //   setTopicId(0)
  //   setCurrentTopicId(0)
  //   setTopicList([{
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
  //   }])
  //   setIsReady(true)
  // }, [])

  const handleSocketOpen = () => {
    const { current: socketTask } = socketTaskRef

    const socketId = +new Date()
    socketIdRef.current = socketId

    socketTask.onOpen(async () => {
      const { userInfo = {} } = await Taro.getUserInfo()
      const { nickName = '', avatarUrl = '' } = userInfo as any
      const openid: string = Taro.getStorageSync('openid')

      const loginInfo = {
        socketId,
        userName: nickName,
        userAvatar: avatarUrl,
        openid,
        type: 'login'
      }

      userInfoRef.current[socketId] = {
        userName: nickName,
        userAvatar: avatarUrl,
        score: 0
      }

      setLeftUser({
        userName: nickName,
        userAvatar: avatarUrl,
        score: 0
      })

      setIsSocketConnected(true)

      socketTask.send({
        data: JSON.stringify(loginInfo)
      })
    })
  }


  const handleSocketMessage = () => {
    const { current: socketTask } = socketTaskRef

    socketTask.onMessage(({ data: socketMessage }: any) => {
      const data = JSON.parse(socketMessage)
      const { type } = data
      console.log('收到信息')
      console.log(data)
      console.log(answerStatus)

      switch (type) {
        case 'system':
          handleSystemMessage(data)
          break;
        case 'match':
          handleMatchMessage(data)
          break;
        case 'ready':
          handleReadyMessage(data)
          break;
        case 'answer':
          handleAnswerMessage(data)
          break;
        case 'close':
          handleRoomClose(data)
          break;
        default:
          break;
      }
    })
  }

  const handleRoomClose = (data: any) => {
    console.log(data)

    // setIsMatch(false)
    // setIsReady(false)
  }

  const handleSystemMessage = (data: any) => {
    const { count } = data

    setOnlineUserCount(count)
  }

  const handleMatchMessage = (data: any) => {
    const { roomId, otherUser, otherUserName, otherUserAvatar } = data
    roomIdRef.current = roomId
    otherSocketIdRef.current = otherUser

    Taro.showToast({
      title: '匹配成功'
    })

    userInfoRef.current[otherUser] = {
      userName: otherUserName,
      userAvatar: otherUserAvatar,
      score: 0
    }

    setRightUser({
      userName: otherUserName,
      userAvatar: otherUserAvatar,
      score: 0
    })

    console.log(userInfoRef)

    setRoomId(roomId)
    setIsMatch(true)
    setIsMatching(false)
  }

  const handleReadyMessage = (data: any) => {
    const { topicId, topicList } = data
    Taro.showToast({
      title: '游戏开始'
    })

    setTopicId(topicId)
    setTopicList(topicList)
    setIsReady(true)

    topicListRef.current = [...topicList]
  }

  const handleAnswerMessage = (data: any) => {
    console.log('\n\n\n执行handleAnswerMessage\n\n\n')

    const { current: socketId } = socketIdRef
    const { answerUser, answerContent, isNext, isFinish, isCorrect } = data
    console.log('收到数据: ')
    console.log(data)
    console.log(isFinish, isCorrect)
    console.log('====')

    const isMyself: boolean = answerUser === socketId

    // const status = [...answerStatus]

    console.log('原来: ')
    console.log(answerContent, answerStatus)

    const optionList = topicListRef.current[currentTopicIdRef.current].optionList
    const answerIndex = optionList.findIndex((item: any) => item.id === answerContent)
    console.log('开始回答')
    console.log(topicListRef.current[currentTopicIdRef.current])
    console.log(optionList)
    console.log(answerIndex)

    answerStatus[answerIndex] = {
      status: isCorrect ? CORRECT_ANSWER : WRONG_ANSWER,
      answerUser
    }
    setAnswerStatus([...answerStatus])

    if (isCorrect) {
      userInfoRef.current[answerUser].score = userInfoRef.current[answerUser].score + 20
      console.log(userInfoRef.current)
      if (isMyself) {
        setLeftUser({
          ...userInfoRef.current[socketIdRef.current],
        })
      } else {
        setRightUser({
          ...userInfoRef.current[otherSocketIdRef.current],
        })
      }
    }

    // if (isMyself && isCorrect) {
    //   setLeftUser({
    //     ...leftUser,
    //     score: leftUser.score + 20
    //   })
    // } else if(!isMyself && isCorrect){
    //   setRightUser({
    //     ...rightUser,
    //     score: rightUser.score + 20
    //   })
    // }

    if (isFinish) {
      console.log('结束了')

      console.log(userInfoRef.current)

      Taro.showToast({
        title: '结束'
      })
      return
    }

    if (isNext) {
      console.log('下一题: ')
      setTimeout(() => {
        setAnswerStatus([{ status: 0, answerUser: 0 }, { status: 0, answerUser: 0 }, { status: 0, answerUser: 0 }, { status: 0, answerUser: 0 }])
        answerStatus[0] = { status: 0, answerUser: 0 }
        answerStatus[1] = { status: 0, answerUser: 0 }
        answerStatus[2] = { status: 0, answerUser: 0 }
        answerStatus[3] = { status: 0, answerUser: 0 }
        setCurrentTopicId(currentTopicIdRef.current + 1)
        currentTopicIdRef.current = currentTopicIdRef.current + 1

        console.log(currentTopicId)
        console.log(topicListRef.current)
      }, 2000)
    }
  }

  const handleMatchClick = () => {
    const { current: socketTask } = socketTaskRef

    const matchInfo = {
      socketId: socketIdRef.current,
      type: 'match',
    }

    socketTask.send({
      data: JSON.stringify(matchInfo)
    })

    setIsMatching(true)
  }

  const handleReadyClick = () => {
    const { current: socketTask } = socketTaskRef

    console.log('点击准备: ', roomIdRef.current)
    const matchInfo = {
      socketId: socketIdRef.current,
      type: 'ready',
      roomId: roomIdRef.current
    }

    Taro.showToast({
      title: '准备成功'
    })

    socketTask.send({
      data: JSON.stringify(matchInfo)
    })
  }

  const handleOptionClick = (option: string, id: number, index: number) => {
    console.log('\n\n\n\n')
    console.log(option, id, index)
    console.log(answerStatus)
    const { current: socketTask } = socketTaskRef
    const { current: roomId } = roomIdRef
    const { current: socketId } = socketIdRef

    if (
      answerStatus[index].status !== 0 ||
      answerStatus.findIndex(item => item.answerUser === socketId) !== -1
    ) return

    socketTask.send({
      data: JSON.stringify({
        type: 'answer',
        roomId,
        socketId,
        data: {
          topicId,
          answerUser: socketId,
          answerContent: id,
          currentTopicId
        }
      })
    })
    // answerStatus[index] = {
    //   status: CORRECT_ANSWER,
    //   answerUser:'123'
    // }
    // setAnswerStatus([...answerStatus])
    console.log(option)
  }

  const { topicContent = '', optionList = [] } = topicList[currentTopicId] || {}

  const answerColor = {
    [WRONG_ANSWER]: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
    [NORMAL_ANSWER]: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    [CORRECT_ANSWER]: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)'
  }

  return (
    <View>
      在线人数: {onlineUserCount}

      <View className="footer__container" hidden={!isSocketConnected}>
        <Button className="match__button" onClick={handleMatchClick} hidden={isMatch}>匹配</Button>
        <Button className="ready__button" onClick={handleReadyClick} hidden={isReady || !isMatch}>准备</Button>
      </View>

      <View className="match__container" hidden={!isMatching}>
        <View className="match__slogan">
          匹配中...
        </View>
        <View className="match__info">
          {leftUser.userName}
          <Image src={leftUser.userAvatar}></Image>
        </View>
      </View>
      <View hidden={!isMatch}>
        匹配成功，房间号: {roomId}
        <View className="game__container">
          <View className="game__userinfo">
            <View>
              <View>{leftUser.userName}</View>
              <View>{leftUser.score}</View>
            </View>
            <Image src={leftUser.userAvatar}></Image>
          </View>
          <View className="game__userinfo game__userinfo--other">
            <View>
              <View>{rightUser.userName}</View>
              <View>{rightUser.score}</View>
            </View>
            <Image src={rightUser.userAvatar || 'http://cdn.algbb.cn/emoji/32.png'}></Image>
          </View>

          <View className="game__logo">
            V.S
          </View>
        </View>
      </View>
      <View hidden={!isReady}>
        <View>
          <View className="options__title">
            {topicContent}
          </View>

          <View className="options__container">
            {optionList.map((item, index) => {
              const status = answerStatus[index].status
              const answerUser = answerStatus[index].answerUser
              const userInfo = userInfoRef.current[answerUser]

              return (
                <View className="options__item"
                  onClick={() => handleOptionClick(item.option, item.id, index)}
                  style={{ backgroundImage: answerColor[status] }}>
                  {item.option}
                  <View className="options__user">
                    {userInfo.userName}
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Game as ComponentType