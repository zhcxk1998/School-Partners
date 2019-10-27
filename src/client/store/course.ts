import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { CourseDetail } from '../modals/course'

class courseStore {
  @observable courseDetail: CourseDetail = {
    courseAuthor: '',
    publishDate: '',
    courseViews: 0,
    courseDescription: '',
    stepName: [],
    stepDetail: [],
    courseRate: 0
  }

  @action.bound
  getCourseDetail(cid: string): any {
    return new Promise(async (resolve, reject) => {
      await Taro.navigateTo({
        url: '/client/pages/course/index'
      })
      Taro.showLoading({
        title: '加载中...'
      })
      const { data } = await Taro.request({
        url: `http://localhost:3000/courses/${cid}`,
        method: 'GET',
      })
      this.courseDetail = data[0]
      Taro.hideLoading()
      resolve()
    })
  }


}

export default courseStore