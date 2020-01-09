import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Empty from '../../components/Forum/Empty'
import infoStore from '../../store/infoStore'
import forumStore from '../../store/forumStore'

import './index.scss'

interface IProps {
  infoStore: infoStore,
  forumStore: forumStore
}

interface IStates {
}

@inject('infoStore', 'forumStore')
@observer
class MyForums extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleModifyClick = this.handleModifyClick.bind(this)
  }

  async componentWillMount() {
    const { title } = this.$router.params
    const { infoStore: { userInfo }, forumStore: { getForumList } } = this.props
    const { nickName } = userInfo
    Taro.setNavigationBarTitle({ title })
    getForumList(nickName)
  }

  async handleDeleteClick(forumId: number) {
    const { infoStore: { userInfo }, forumStore: { getForumList } } = this.props
    const { nickName } = userInfo
    await Taro.request({
      url: `http://localhost:3000/forums/${forumId}`,
      method: 'DELETE'
    })
    Taro.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
    getForumList(nickName)
  }

  handleModifyClick(forumId: number): void {
    Taro.navigateTo({
      url: `/pages/forumModify/index?forumId=${forumId}`
    })
  }

  render() {
    const { forumStore: { myForumList } } = this.props
    return (
      <View className="myforum-list__container">
        {myForumList.slice().length === 0 ? <Empty /> : myForumList.slice().map(forum => {
          const { forumImage, forumTitle, forumContent, forumLike, forumComment, forumId, publishTime } = forum
          return (
            <View className="myforum-list__wrap" key={forumId}>
              <View className="wrap__content">
                <Image className="image" src={forumImage} mode="aspectFill" />
                <View className="info">
                  <View className="title">{forumTitle}</View>
                  <View className="content">{forumContent}</View>
                  <View className="status">
                    <View className="iconfont icon-like" />{forumLike}
                    <View className="iconfont icon-comment" />{forumComment}
                  </View>
                </View>
              </View>
              <View className="wrap__footer">
                <View className="time">{publishTime}</View>
                <View className="action" onClick={() => { this.handleModifyClick(forumId) }}>修改</View>
                <View className="action action--delete" onClick={() => { this.handleDeleteClick(forumId) }}>删除</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default MyForums as ComponentType