import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'

import { CourseInfo } from '../../modals/courseList'
import courseStore from '../../../store/courseStore'

import './index.scss'

interface IProps {
  courseStore: courseStore
}

interface IState {
  courseList: Array<CourseInfo>,
  searchValue: string
}

@inject('courseStore')
@observer
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
    const { courseStore: { getCourseDetail } } = this.props;
    const { courseList, searchValue } = this.state
    return (
      <View className="course-list">
        <AtSearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
        />
        <View className="course-list__container">
          {courseList.map(course => {
            const { id, courseName } = course
            return (
              <View className="course-list__wrap" key={id}  onClick={() => { getCourseDetail(id, courseName) }}>
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