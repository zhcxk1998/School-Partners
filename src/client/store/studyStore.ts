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

  @observable exerciseList: Array<{
    exercise_cid: string,
    exercise_name: string,
    exercise_content: string,
    is_hot: string
  }>

  @observable hotExerciseList: Array<{
    exercise_cid: string,
    exercise_name: string,
    exercise_content: string,
    is_hot: string
  }>

  isRecommend(course): boolean {
    return course.is_recommend
  }

  isHot(course): boolean {
    return course.is_hot
  }

  @action.bound
  getCourseList(): any {
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

  @action.bound
  getExerciseList(): any {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'http://localhost:3000/exercises',
        method: 'GET',
      })
      this.exerciseList = data;
      this.hotExerciseList = data.filter(this.isHot)
      resolve()
    })
  }
}

export default studyStore