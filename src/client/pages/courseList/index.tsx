import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import { CourseInfo } from '../../modals/courseList'

import './index.scss'

interface IProps {

}

interface IState {
  courseList: Array<CourseInfo>,
  searchValue: string
}

class CourseList extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      courseList: [],
      searchValue: ''
    }
  }

  async componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '课程列表'
    })
    const { data } = await Taro.request({
      url: 'http://localhost:3000/courses'
    })
    this.setState({
      courseList: data
    })
  }

  handleSearchChange(searchValue: string) {
    this.setState({ searchValue })
  }

  render() {
    const { courseList, searchValue } = this.state
    return (
      <View className="course-list">
        <AtSearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
        />
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
      </View>

    )
  }
}

export default CourseList as ComponentType