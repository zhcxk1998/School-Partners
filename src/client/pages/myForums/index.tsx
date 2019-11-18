import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Empty from '../../components/Forum/Empty'
import { ForumInfo } from '../../modals/forumList'
import infoStore from '../../store/infoStore'

import './index.scss'

interface IProps {
  infoStore: infoStore
}

interface IStates {
  forumList: Array<ForumInfo>
}

@inject('infoStore')
@observer
class MyForums extends Component<IProps, IStates>{
  constructor(props) {
    super(props)
    this.state = {
      forumList: []
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  async componentDidMount() {
    const { title } = this.$router.params
    const { infoStore: { userInfo } } = this.props
    const { nickName } = userInfo
    Taro.setNavigationBarTitle({ title })

    const { data } = await Taro.request({
      url: `http://localhost:3000/forums/`,
      method: 'POST',
      data: {
        forumAuthor: nickName
      }
    })
    if (data.code === 404) return
    this.setState({ forumList: data })
  }

  async handleDeleteClick(forumId: number) {
    await Taro.request({
      url: `http://localhost:3000/forums/${forumId}`,
      method: 'DELETE'
    })
    Taro.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
    const { forumList } = this.state
    const deleteIndex = forumList.findIndex(forum => forum.forumId === forumId)
    forumList.splice(deleteIndex, 1)
    this.setState({
      forumList
    })
  }

  render() {
    const { forumList } = this.state
    return (
      <View className="myforum-list__container">
        {forumList.length === 0 ? <Empty /> : forumList.map(forum => {
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
                <View className="action">已发布</View>
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