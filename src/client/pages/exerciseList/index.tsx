import Taro, { Component } from '@tarojs/taro'
import { ComponentType } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar, AtIcon } from 'taro-ui'

import { ExerciseList } from '../../modals/exerciseList'

import './index.scss'

interface IProps {

}

interface IState {
  exerciseList: Array<ExerciseList>
  searchValue: string
}

class CourseList extends Component<IProps, IState>{
  constructor(props) {
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

  handleSearchChange(searchValue) {
    this.setState({ searchValue })
  }

  render() {
    const { exerciseList, searchValue } = this.state
    return (
      <View className="exercise-list">
        <AtSearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
        />
        <View className="exercise-list__container">
          {exerciseList.map(exercise => {
            const { exerciseCid, exerciseName, finsihCount, totalCount, difficultyDegree, exerciseType } = exercise
            return (
              <View className="exercise-list__wrap" key={exerciseCid}>
                <View className="name">{exerciseName}</View>
                <View className="status-bar">
                  {finsihCount}人完成&emsp;共{totalCount}题&emsp;-{difficultyDegree}-&emsp;
                  <View className={`type ${exerciseType === '会员' ? 'type--charge' : ''}`}>{exerciseType}</View>
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