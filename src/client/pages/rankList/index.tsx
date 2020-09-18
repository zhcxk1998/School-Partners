import React, { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.scss'

interface IProps {

}

type IRankItem = {
  count: number,
  total: number,
  studentId: number,
  studentName: string,
  studentAvatar: string,
  nickName: string,
  correctRate: string
}

interface IState {
  rankList: IRankItem[]
}

class RankList extends Component<IProps, IState>{
  config: Config = {
    navigationBarTitleText: '排行榜'
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      rankList: []
    }
  }

  async componentDidMount() {
    const { data } = await Taro.request({
      url: 'http://localhost:3000/exercises-rank'
    })
    const { rankList = [] } = data

    this.setState({
      rankList
    })
  }

  render() {
    const { rankList } = this.state
    // const rankList = [
    //   { avatar: 'http://cdn.algbb.cn/emoji/32.png', name: 'Tom Mark', score: 13122 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/31.png', name: 'Bruce Alex', score: 23124 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/30.png', name: 'Chirs Ford', score: 45631 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/29.png', name: 'Ben Dick', score: 16341 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/28.png', name: 'Martin Hugo', score: 23145 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/27.png', name: 'Lee Oliver', score: 34123 },
    //   { avatar: 'http://cdn.algbb.cn/emoji/26.png', name: 'Mark Rex', score: 56142 }
    // ]

    return (
      <View className="rank-list__container">
        <View className="rank-list__background" />
        <View className="rank-list__wrap--champion">
          <Image className="decoration" src="http://cdn.algbb.cn/rank/crown.png" />
          <Image className="avatar" src={rankList[0].studentAvatar} />
          <View>
            <View className="name">{rankList[0].nickName}</View>
            <View className="realname">
              <Text>({rankList[0].studentName})</Text>
              <View className="score">{rankList[0].count}</View>
            </View>
          </View>
        </View>

        {/* <View className="rank-list__wrap rank-list__wrap--header">
          <View className="number"></View>
          <View className="score">做题数</View>
        </View> */}

        {rankList.slice(1).map((rank, index) => {
          const { studentAvatar, nickName, studentName, count } = rank
          return (
            <View className="rank-list__wrap" key={index}>
              <View className="number">{index + 2}</View>
              <Image className="avatar" src={studentAvatar} />
              <View className="name">
                {nickName}
                <View className="realname">
                  ({studentName})
                </View>
              </View>
              <View className="score">{count}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default RankList as ComponentType