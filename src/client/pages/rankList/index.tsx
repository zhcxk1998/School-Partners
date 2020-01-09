import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IProps {

}

interface IState {

}

class RankList extends Component<IProps, IState>{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '排行榜'
    })
  }

  render() {
    const rankList = [
      { avatar: 'http://cdn.algbb.cn/emoji/32.png', name: 'Tom Mark', score: 13122 },
      { avatar: 'http://cdn.algbb.cn/emoji/31.png', name: 'Bruce Alex', score: 23124 },
      { avatar: 'http://cdn.algbb.cn/emoji/30.png', name: 'Chirs Ford', score: 45631 },
      { avatar: 'http://cdn.algbb.cn/emoji/29.png', name: 'Ben Dick', score: 16341 },
      { avatar: 'http://cdn.algbb.cn/emoji/28.png', name: 'Martin Hugo', score: 23145 },
      { avatar: 'http://cdn.algbb.cn/emoji/27.png', name: 'Lee Oliver', score: 34123 },
      { avatar: 'http://cdn.algbb.cn/emoji/26.png', name: 'Mark Rex', score: 56142 }
    ]

    return (
      <View className="rank-list__container">
        <View className="rank-list__background" />
        <View className="rank-list__wrap--champion">
          <Image className="decoration" src="http://cdn.algbb.cn/rank/crown.png" />
          <Image className="avatar" src={rankList[0].avatar} />
          <View className="name">{rankList[0].name}</View>
          <View className="score">{rankList[0].score}</View>
        </View>
        {rankList.slice(1).map((rank, index) => {
          const { avatar, name, score } = rank
          return (
            <View className="rank-list__wrap" key={index}>
              <View className="number">{index + 2}</View>
              <Image className="avatar" src={avatar} />
              <View className="name">{name}</View>
              <View className="score">{score}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default RankList as ComponentType