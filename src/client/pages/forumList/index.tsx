import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View, Image } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'

import forumStore from '../../store/forumStore'

import './index.scss'

interface IProps {
  forumStore: forumStore
}

interface IStates {

}

@inject('forumStore')
@observer
class ForumList extends Component<IProps, IStates>{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
    const { forumStore: { getForumList } } = this.props
    getForumList()
  }

  navigateTo(forumId: number, forumTitle: string): void {
    Taro.navigateTo({
      url: `/client/pages/forumDetail/index?forumId=${forumId}&forumTitle=${forumTitle}`
    })
  }

  render() {
    const { forumStore: { forumList } } = this.props

    return (
      <View className="forum__container">
        <View className="forum__publish">
          <View className="forum__publish--background"></View>
          <Image className="icon" src="http://cdn.algbb.cn/forum/add.png" mode="aspectFill" onClick={() => { Taro.navigateTo({ url: '/client/pages/forumPublish/index' }) }} />
        </View>
        {forumList.map(forum => {
          const { forumId, forumAvatar, forumAuthor, timeAgo, forumImage, forumTitle, forumContent, forumLike, forumComment } = forum
          return (
            <View className="forum__wrap" key={forumId}>
              <View className="header">
                <Image className="avatar" src={forumAvatar} mode="aspectFill" />
                <View className="author">
                  {forumAuthor}
                  <View className="time">{timeAgo === 0 ? 'today' : `${timeAgo} days ago`}</View>
                </View>
                <View className="iconfont icon-more more" />
              </View>
              <Image className="image" src={forumImage} mode="aspectFill" onClick={() => { this.navigateTo(forumId, forumTitle) }} />
              <View className="content__wrap" onClick={() => { this.navigateTo(forumId, forumTitle) }}>
                <View className="title">
                  {forumTitle}
                </View>
                <View className="content">
                  {forumContent}
                </View>
              </View>
              <View className="status">
                <View className="iconfont icon-like" />
                {forumLike}
                <View className="iconfont icon-comment" />
                {forumComment}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default ForumList as ComponentType