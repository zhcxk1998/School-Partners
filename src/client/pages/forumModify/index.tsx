import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View, Form, Textarea, Button, Input } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'

import infoStore from '../../store/infoStore'
import forumStore from '../../store/forumStore'

import './index.scss'

interface IProps {
  infoStore: infoStore,
  forumStore: forumStore
}

interface IStates {
  forumTitle: string,
  forumContent: string
}

@inject('infoStore', 'forumStore')
@observer
class ForumPublish extends Component<IProps, IStates>{
  constructor(props) {
    super(props)
    this.state = {
      forumTitle: '',
      forumContent: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    Taro.setNavigationBarTitle({ title: '修改帖子' })
    const { forumId } = this.$router.params
    const { data: { forumTitle, forumContent } } = await Taro.request({
      url: `http://localhost:3000/forums/${forumId}`,
      method: 'GET'
    })
    this.setState({
      forumTitle,
      forumContent
    })
  }

  async handleSubmit(e) {
    const { forumId } = this.$router.params
    const { detail: { value } } = e
    const { forumTitle, forumContent } = value
    const { infoStore: { userInfo }, forumStore: { getForumList } } = this.props
    const { nickName } = userInfo

    const { data } = await Taro.request({
      url: `http://localhost:3000/forums/${forumId}`,
      method: 'PUT',
      data: {
        forumTitle,
        forumContent,
      }
    })

    Taro.showToast({
      title: data.msg,
    })

    getForumList(nickName)

    Taro.navigateBack({ delta: 1 })
  }

  render() {
    const { forumTitle, forumContent } = this.state
    return (
      <View className="forum-publish__container">
        <Form onSubmit={this.handleSubmit} >
          <View className="title__wrap">
            <View className="label">帖子标题:</View>
            <Input className="input" name="forumTitle" placeholder="请输入标题..." value={forumTitle} />
          </View>
          <View className="content__wrap">
            <View className="label">帖子内容:</View>
            <Textarea className="content" name="forumContent" value={forumContent} placeholder="请输入内容..." />
          </View>
          <Button className="submit" formType="submit">立 即 修 改</Button>
        </Form>
      </View>
    )
  }
}

export default ForumPublish as ComponentType