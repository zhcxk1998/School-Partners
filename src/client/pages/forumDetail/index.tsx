import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from "@tarojs/components";

import { ForumInfo } from '../../modals/forumList'

import './index.scss'

interface IProps {
  forumId: number
}

interface IStates {
  forumDetail: ForumInfo
}

class ForumDetail extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      forumDetail: {
        forumId: 0,
        forumAvatar: '',
        forumAuthor: '',
        publishTime: '',
        timeAgo: 0,
        forumImage: '',
        forumTitle: '',
        forumContent: '',
        forumLike: 0,
        forumComment: 0
      }
    }
  }

  async componentDidMount() {
    const { forumId, forumTitle } = this.$router.params
    Taro.setNavigationBarTitle({ title: forumTitle })
    const { data } = await Taro.request({ url: `http://localhost:3000/forums/${forumId}` })
    this.setState({
      forumDetail: data
    })
  }

  render() {
    const { forumDetail: { forumAvatar, forumAuthor, publishTime, forumImage, forumTitle, forumContent, forumLike, forumComment } } = this.state
    return (
      <View className="forum-detail__container">
        <View className="forum-detail__header">
          <Image className="avatar" src={forumAvatar} mode="aspectFill" />
          <View className="author">
            {forumAuthor}
          </View>
          <View className="iconfont icon-star star" />
        </View>
        <Image className="forum-detail__image" src={forumImage} />
        <View className="forum-detail__wrap">
          <View className="title">
            {forumTitle}
            <View className="time">{publishTime}</View>
          </View>
          <View className="time"></View>
          <View className="content">
            {forumContent}{forumContent}
          </View>
        </View>
        <View className="forum-detail__footer">
          <View className="iconfont icon-like" />
          {forumLike}
          <View className="iconfont icon-comment" />
          {forumComment}
          <Input className="input" type='text' placeholder='请输入你的评论...' confirmType="send" />
        </View>
      </View>
    )
  }
}

export default ForumDetail as ComponentType