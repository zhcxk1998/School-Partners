import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View } from '@tarojs/components'
import { CourseInfos } from '../../modals/courseList'

import './index.scss'

interface IProps {

}

interface IState {
  courseList: Array<CourseInfos>
}

class CourseList extends Component<IProps, IState>{
  constructor(props) {
    super(props)
    this.state = {
      courseList: []
    }
  }

  async componentDidMount() {
    Taro.setNavigationBarTitle({
      title:'课程列表'
    })
    const { data } = await Taro.request({
      url: 'http://localhost:3000/courses'
    })
    this.setState({
      courseList: data
    })
  }

  render() {
    const { courseList } = this.state
    return (
      <View className="course-list__container">
        {courseList.map(course => {
          const { courseCid, courseName } = course
          return (
            <View className="course-list__wrap" key={courseCid}>
              <View className="cover"></View>
              <View className="name">{courseName}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default CourseList as ComponentType