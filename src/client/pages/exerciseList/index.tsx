import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtIcon } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import { ExerciseInfo } from '../../modals/exerciseDetail'
import exerciseStore from '../../store/exerciseStore'

import './index.scss'

interface IProps {
  exerciseStore: exerciseStore
}

interface IState {
  exerciseList: Array<ExerciseInfo>
  searchValue: string
}

@inject('exerciseStore')
@observer
class CourseList extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      exerciseList: [],
      searchValue: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  async componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '习题列表'
    })
    const { data } = await Taro.request({
      url: 'http://localhost:3000/exercises'
    })
    this.setState({
      exerciseList: data
    })
  }

  handleSearchChange(searchValue: string) {
    this.setState({ searchValue })
  }

  generateDifficulty(exerciseDifficulty: number): string {
    const difficultyList = {
      1: '简单',
      2: '中等',
      3: '困难'
    }
    return difficultyList[exerciseDifficulty]
  }

  generateType(exerciseType: number): string {
    const typeList = {
      1: '免费',
      2: '会员'
    }
    return typeList[exerciseType]
  }

  render() {
    const { exerciseStore: { getExerciseDetail } } = this.props
    const { exerciseList, searchValue } = this.state
    return (
      <View className="exercise-list">
        <AtSearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
        />
        <View className="exercise-list__container">
          {exerciseList.map(exercise => {
            const { id, exerciseName, finsihCount, totalCount, exerciseDifficulty, exerciseType } = exercise
            return (
              <View className="exercise-list__wrap" key={id} onClick={() => { getExerciseDetail(id) }}>
                <View className="name">{exerciseName}</View>
                <View className="status-bar">
                  {finsihCount}人完成&emsp;共{totalCount}题&emsp;-{this.generateDifficulty(exerciseDifficulty)}-&emsp;
                  <View className={`type ${exerciseType === 2 ? 'type--charge' : ''}`}>{this.generateType(exerciseType)}</View>
                </View>
                <AtIcon className="icon" value='edit' />
              </View>
            )
          })}

        </View>
      </View>
    )
  }
}

export default CourseList as ComponentType