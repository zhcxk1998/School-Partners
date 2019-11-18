import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View, Form, Textarea, Button, Input, Label } from '@tarojs/components'
import { AtInput, AtForm, AtTextarea, AtButton } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'

import infoStore from '../../store/infoStore'

import './index.scss'

interface IProps {
  infoStore: infoStore
}

interface IStates {
  forumTitle: string
}

@inject('infoStore')
@observer
class ForumPublish extends Component<IProps, IStates>{
  constructor(props) {
    super(props)
    this.state = {
      forumTitle: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({ title: '发布帖子' })
  }

  async handleSubmit(e) {
    const { detail: { value } } = e
    const { infoStore: { userInfo } } = this.props
    const { forumTitle, forumContent } = value
    const { nickName, avatarUrl } = userInfo

    const { data } = await Taro.request({
      url: 'http://localhost:3000/forums',
      method: 'PUT',
      data: {
        forumTitle,
        forumContent,
        forumAuthor: nickName,
        forumAvatar: avatarUrl
      }
    })

    Taro.showToast({
      title: data.msg,
    })
  }

  render() {
    return (
      <View className="forum-publish__container">
        <Form onSubmit={this.handleSubmit} >
          <View className="title__wrap">
            <View className="label">帖子标题:</View>
            <Input className="input" name="forumTitle" placeholder="请输入标题..." />
          </View>
          <View className="content__wrap">
            <View className="label">帖子内容:</View>
            <Textarea className="content" name="forumContent" value="" placeholder="请输入内容..." />
          </View>
          <Button className="submit" formType="submit">立 即 发 送</Button>
        </Form>
      </View>
    )
  }
}

export default ForumPublish as ComponentType