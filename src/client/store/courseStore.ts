import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { CourseInfo } from '../modals/courseDetail'

class courseStore {
  @observable courseDetail: CourseInfo = {
    courseAuthor: '',
    publishDate: '',
    courseViews: 0,
    courseDescription: '',
    stepName: [],
    stepDetail: [],
    courseRate: 0
  }

  @action.bound
  getCourseDetail(cid: string, title: string): any {
    return new Promise(async (resolve, reject) => {
      Taro.showLoading({
        title: '加载中...'
      })
      const { data } = await Taro.request({
        url: `http://localhost:3000/courses/${cid}`,
        method: 'GET',
      })
      this.courseDetail = data[0]
      await Taro.navigateTo({
        url: `/client/pages/courseDetail/index`
      })
      Taro.setNavigationBarTitle({
        title
      })
      Taro.hideLoading()
      resolve()
    })
  }


}

export default courseStore