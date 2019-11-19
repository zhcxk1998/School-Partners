import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { ForumInfo } from '../modals/forumList'

class forumStore {
  @observable myForumList: Array<ForumInfo> = []
  @observable forumList: Array<ForumInfo> = []

  @action.bound
  getForumList(forumAuthor?: string) {
    return new Promise(async (resolve, reject) => {
      if (forumAuthor) {
        const { data } = await Taro.request({
          url: `http://localhost:3000/forums/`,
          method: 'POST',
          data: {
            forumAuthor
          }
        })
        this.myForumList = data.code === 404 ? [] : data
      } else {
        const { data } = await Taro.request({
          url: `http://localhost:3000/forums/`,
          method: 'GET',
        })
        this.forumList = data
      }
      resolve()
    })
  }
}

export default forumStore