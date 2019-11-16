import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IProps {

}

interface IStates {

}

class ForumList extends Component<IProps, IStates>{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const forumList = [
      {
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132',
        author: 'Chen Kang',
        time: 2,
        image: 'http://cdn.algbb.cn/forum/1.jpg',
        title: '在校大学生竟然做出这种事',
        content: '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！',
        like: 24,
        comment: 12
      },
      {
        avatar: 'http://cdn.algbb.cn/emoji/30.png',
        author: 'Bob Tom',
        time: 0,
        image: 'http://cdn.algbb.cn/forum/2.jpg',
        title: '毕业前必须知道的18件事情',
        content: '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！',
        like: 11,
        comment: 45
      },
      {
        avatar: 'http://cdn.algbb.cn/emoji/32.png',
        author: 'Rose Steven',
        time: 4,
        image: 'http://cdn.algbb.cn/forum/3.jpg',
        title: '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！',
        content: '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！',
        like: 34,
        comment: 8
      }
    ]

    return (
      <View className="forum__container">
        {forumList.map((forum, index) => {
          const { avatar, author, time, image, title, content, like, comment } = forum
          return (
            <View className="forum__wrap" key={index}>
              <View className="header">
                <Image className="avatar" src={avatar} mode="aspectFill" />
                <View className="author">
                  {author}
                  <View className="time">{time} days ago</View>
                </View>
                <View className="iconfont icon-more more" />
              </View>
              <Image className="image" src={image} />
              <View className="content__wrap">
                <View className="title">
                  {title}
                </View>
                <View className="content">
                  {content}
                </View>
              </View>
              <View className="status">
                <View className="iconfont icon-like" />
                {like}
                <View className="iconfont icon-comment" />
                {comment}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default ForumList as ComponentType