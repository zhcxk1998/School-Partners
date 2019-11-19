import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { ForumInfo } from '../modals/forumList'

class forumStore {
  @observable myForumList: Array<ForumInfo> = []

  @action.bound
  getForumList(forumAuthor: string) {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: `http://localhost:3000/forums/`,
        method: 'POST',
        data: {
          forumAuthor
        }
      })
      if (data.code === 404) return
      this.myForumList = data
      resolve()
    })
  }
}

export default forumStore