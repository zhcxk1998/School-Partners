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
  userAvatar: string
}

const WRONG_ANSWER: number = -1
const NORMAL_ANSWER: number = 0
const CORRECT_ANSWER: number = 1

const Game: FC<IProps> = (props: IProps) => {
  const [isMyself, setIsMyself] = useState<boolean>(false)
  const [isMatching, setIsMatching] = useState<boolean>(false)
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)

  const [leftUser, setLeftUser] = useState<UserInfo>({ userName: '', userAvatar: '' })
  const [rightUser, setRightUser] = useState<UserInfo>({ userName: '', userAvatar: '' })

  const [answerUser, setAnswerUser] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')
  const [onlineUserCount, setOnlineUserCount] = useState<number>(0)
  const [currentTopicId, setCurrentTopicId] = useState<number>(0)
  const [currentOptionId, setCurrentOptionId] = useState<number>(-1)
  const [topicId, setTopicId] = useState<number>(0)

  const [answerStatus, setAnswerStatus] = useState<any[]>([
    0, 0, 0, 0
  ])
  const [topicList, setTopicList] = useState<any[]>([])
  const socketTaskRef: MutableRefObject<any> = useRef(null)
  const socketIdRef: MutableRefObject<number> = useRef(-1)
  const roomIdRef: MutableRefObject<string> = useRef('')
  const userInfoRef: MutableRefObject<object> = useRef({})

  useEffect(() => {
    Taro.connectSocket({
      url: socketUrl
    }).then(task => {
      socketTaskRef.current = task

      handleSocketOpen()
      handleSocketMessage()
    })
  }, [])

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
        userAvatar: avatarUrl
      }

      setLeftUser({
        userName: nickName,
        userAvatar: avatarUrl
      })

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
  }

  const handleSystemMessage = (data: any) => {
    const { count } = data

    setOnlineUserCount(count)
  }

  const handleMatchMessage = (data: any) => {
    const { roomId, otherUser, otherUserName, otherUserAvatar } = data
    roomIdRef.current = roomId

    Taro.showToast({
      title: '匹配成功'
    })

    userInfoRef.current[otherUser] = {
      userName: otherUserName,
      userAvatar: otherUserAvatar
    }

    setRightUser({
      userName: otherUserName,
      userAvatar: otherUserAvatar
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

    answerStatus[answerContent] = {
      status: isCorrect ? CORRECT_ANSWER : WRONG_ANSWER,
      answerUser
    }
    setAnswerStatus([...answerStatus])

    if (isFinish) {
      console.log('结束了')
      Taro.showToast({
        title: '结束'
      })
      return
    }

    if (isNext) {
      console.log('下一题: ')
      setTimeout(() => {
        setAnswerStatus([{ status: 0, answerUser: '' }, { status: 0, answerUser: '' }, { status: 0, answerUser: '' }, { status: 0, answerUser: '' }])
        answerStatus[0] = { status: 0, answerUser: '' }
        answerStatus[1] = { status: 0, answerUser: '' }
        answerStatus[2] = { status: 0, answerUser: '' }
        answerStatus[3] = { status: 0, answerUser: '' }
        setCurrentTopicId(topicId + 1)
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

    socketTask.send({
      data: JSON.stringify(matchInfo)
    })
  }

  const handleOptionClick = (option: string, index: number) => {
    const { current: socketTask } = socketTaskRef
    const { current: roomId } = roomIdRef
    const { current: socketId } = socketIdRef
    socketTask.send({
      data: JSON.stringify({
        type: 'answer',
        roomId,
        socketId,
        data: {
          topicId,
          answerUser: socketId,
          answerContent: index,
          currentTopicId
        }
      })
    })
    console.log(option)
  }

  const { topicContent = '', optionList = [] } = topicList[currentTopicId] || {}

  const answerColor = {
    [WRONG_ANSWER]: 'red',
    [NORMAL_ANSWER]: 'white',
    [CORRECT_ANSWER]: 'blue'
  }

  return (
    <View>
      {currentTopicId}
      在线人数: {onlineUserCount}

      <View className="footer__container">
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
            <View>{leftUser.userName}</View>
            <Image src={leftUser.userAvatar}></Image>
          </View>
          <View className="game__userinfo game__userinfo--other">
            <View>{rightUser.userName}123</View>
            <Image src={rightUser.userAvatar || 'http://cdn.algbb.cn/emoji/32.png'}></Image>
          </View>
        </View>
      </View>
      <View hidden={!isReady}>
        <View>
          题目内容: {topicContent}

          <View className="container">
            {optionList.map((item, index) => {
              const status = answerStatus[index].status
              const answerUser = answerStatus[index].answerUser
              const userInfo = userInfoRef.current[answerUser]

              return (
                <View className="wrap" style={{ background: answerColor[status] }}>
                  <View className="option" key={item.id} onClick={() => handleOptionClick(item.option, index)}>{String.fromCharCode(65 + index)}</View>
                  {item.option}
                  {userInfo.userName}
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