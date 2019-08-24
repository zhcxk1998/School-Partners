import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

class studyStore {
  @observable courseList: Array<{
    courseCid: string,
    courseName: string,
    isRecommend: string
  }> = [];

  @observable recommendCourseList: Array<{
    courseCid: string,
    courseName: string,
    isRecommend: string
  }> = [];

  @observable exerciseList: Array<{
    exerciseCid: string,
    exerciseName: string,
    exerciseContent: string,
    isHot: string
  }>

  @observable hotExerciseList: Array<{
    exerciseCid: string,
    exerciseName: string,
    exerciseContent: string,
    isHot: string
  }>

  isRecommend(course): boolean {
    return course.isRecommend
  }

  isHot(course): boolean {
    return course.isHot
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