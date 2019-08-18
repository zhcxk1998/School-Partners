import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

class studyStore {
  @observable courseList: Array<{
    course_cid: string,
    course_name: string,
    is_recommend: string
  }> = [];

  @observable recommendCourseList: Array<{
    course_cid: string,
    course_name: string,
    is_recommend: string
  }> = [];

  isRecommend(course) {
    return course.is_recommend === 'true'
  }

  @action.bound
  getCourseList() {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      this.courseList = data;
      this.recommendCourseList = data.filter(this.isRecommend)
      resolve()
    })
  }

}

export default studyStore