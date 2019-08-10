import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'

import Topic from '../../components/Exam/Topic/index'
import Options from '../../components/Exam/Options/index'
import Status from '../../components/Exam/Status/index'

import getExamTopic from '../../utils/getExamTopic'

import './index.scss'


interface IProps {
  examStore: {
    currentPage: number,
    nextPage: Function,
    previousPage: Function,
    setPage: Function,
  }
}

interface IState {
  topics: Array<{ type: string, topic: string, options: Array<string> }>,
  answers: Array<Array<number>>
}

@inject('examStore')
@observer
class Exam extends Component<IProps, IState> {

  config: Config = {
    navigationBarTitleText: '做题'
  }

  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      answers: []
    }
  }

  async componentDidMount() {
    await this.fetchExamTopic()
  }

  async fetchExamTopic() {
    const topics: Array<{ type: string, topic: string, options: Array<string> }> = await getExamTopic()
    const answers: Array<Array<number>> = Array.from({ length: topics.length }, (_, index) => Array.from({ length: topics[index].options.length }, __ => 0))
    // const answers: Array<Array<number>> = Array(topics.length).fill(0).map((_, index) => Array(topics[index].options.length).fill(-1))
    this.setState({
      topics,
      answers
    })
  }

  switchPage(index: number) {
    const { examStore: { setPage } } = this.props;
    setPage(index)
  }

  generateTab(): Array<{ title: string }> {
    const { topics } = this.state;
    return Array.from({ length: topics.length }).map((_, index) => ({ title: (index + 1).toString() }))
  }

  handleOptionClick(number: number, index: number, type: string): void {
    const { answers } = this.state;
    if (type === 'radio') {
      answers[number].fill(0) 
    }
    answers[number][index] = answers[number][index] === 1 ? 0 : 1
    this.setState({
      answers
    })

  }

  render() {
    const { topics, answers } = this.state;
    const { examStore: { currentPage } } = this.props;
    const tabList = this.generateTab();
    return (
      <View className='exam-container'>
        <AtTabs
          current={currentPage}
          scroll
          tabList={tabList}
          onClick={this.switchPage.bind(this)}>
          {topics.map((item, index) => {
            const { type, topic, options } = item
            return (
              <AtTabsPane current={currentPage} index={index} key={index}>
                <View className='exam-timer'></View>
                <Topic type={type} topic={topic} />
                <Options options={options} number={index} answers={answers} type={type} handleOptionClick={this.handleOptionClick.bind(this)} />
              </AtTabsPane>
            )
          })}
        </AtTabs>
        {/* <View className='exam-timer'>

        </View>
        <Topic type={type} topic={topic} />
        <Options options={options} />
        <Status></Status> */}
        <Status></Status>
      </View>
    )
  }
}

export default Exam as ComponentType
