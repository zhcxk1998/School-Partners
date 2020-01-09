import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

import { CourseInfo } from '../modals/courseList'
import { ExerciseInfo } from '../modals/exerciseList'

class studyStore {
  @observable courseList: Array<CourseInfo> = [];

  @observable recommendCourseList: Array<CourseInfo> = [];

  @observable exerciseList: Array<ExerciseInfo>

  @observable hotExerciseList: Array<ExerciseInfo>

  isRecommend(course: CourseInfo): boolean {
    return course.isRecommend
  }

  isHot(course: ExerciseInfo): boolean {
    return course.isHot
  }

  @action.bound
  getCourseList(): any {
    return new Promise(async (resolve) => {
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
    return new Promise(async (resolve) => {
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