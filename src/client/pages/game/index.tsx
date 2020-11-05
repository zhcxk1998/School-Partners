import React, { ComponentType } from 'react'
import Taro, { FC, MutableRefObject, useEffect, useRef, useState } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'

const config = require('../../config/common')

const { socketUrl } = config

import './index.scss'
import { TopicAnswerRules } from '@/admin/pages/ExamModify/formValidate'

interface IProps {

}

const WRONG_ANSWER: number = -1
const NORMAL_ANSWER: number = 0
const CORRECT_ANSWER: number = 1

const Game: FC<IProps> = (props: IProps) => {
  const [isMyself, setIsMyself] = useState<boolean>(false)
  const [isMatching, setIsMatching] = useState<boolean>(false)
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
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

    const loginInfo = {
      socketId,
      userName: 'bb',
      userAvatar: 'bb',
      openid: '',
      type: 'login'
    }

    socketTask.onOpen(() => {
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
        default:
          break;
      }
    })
  }

  const handleSystemMessage = (data: any) => {
    const { count, topicList, topicId } = data

    setTopicId(topicId)
    setTopicList(topicList)
    setOnlineUserCount(count)
  }

  const handleMatchMessage = (data: any) => {
    const { roomId } = data
    roomIdRef.current = roomId

    Taro.showToast({
      title: '匹配成功'
    })

    setRoomId(roomId)
    setIsMatch(true)
    setIsMatching(false)
  }

  const handleReadyMessage = (data: any) => {
    Taro.showToast({
      title: '游戏开始'
    })

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

    answerStatus[answerContent] = isCorrect ? CORRECT_ANSWER : WRONG_ANSWER
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
        setAnswerStatus([0, 0, 0, 0])
        answerStatus[0] = 0
        answerStatus[1] = 0
        answerStatus[2] = 0
        answerStatus[3] = 0
        setCurrentTopicId(topicId + 1)
      }, 2000)
    }




  }

  const handleMatchClick = () => {
    const { current: socketTask } = socketTaskRef

    const matchInfo = {
      socketId: socketIdRef.current,
      type: 'match',
      userName: 'bb',
      userAvatar: 'bb',
      openid: '',
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
      userName: 'bb',
      userAvatar: 'bb',
      openid: '',
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
        userName: 'bb',
        userAvatar: 'bb',
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
      {answerStatus.toString()}
      在线人数: {onlineUserCount}
      <Button onClick={handleMatchClick}>匹配</Button>
      <Button onClick={handleReadyClick}>准备</Button>
      <View hidden={!isMatching}>匹配中...</View>
      <View hidden={isReady || !isMatch}>
        匹配成功，房间号: {roomId}
      </View>
      <View hidden={!isReady}>
        <View className="user">
          <View className="username--myself"></View>
          <View className="username--other"></View>
        </View>
        <View>
          题目内容: {topicContent}

          <View className="container">
            {optionList.map((item, index) => (
              <View className="wrap" style={{ background: answerColor[answerStatus[index]] }}>
                <View className="option" key={item.id} onClick={() => handleOptionClick(item.option, index)}>{String.fromCharCode(65 + index)}</View>
                {item.option}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Game as ComponentType