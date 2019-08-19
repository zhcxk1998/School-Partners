import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'

import Topic from '../../components/Exam/Topic/index'
import Options from '../../components/Exam/Options/index'
import Status from '../../components/Exam/Status/index'

import exerciseStore from '../../store/exerciseStore';

import './index.scss'


interface IProps {
  exerciseStore: exerciseStore
}

@inject('exerciseStore')
@observer
class Exam extends Component<IProps, {}> {

  config: Config = {
    navigationBarTitleText: '刷题'
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    Taro.showLoading({
      title: '请稍等...'
    })
    await this.fetchExamTopic()
    Taro.hideLoading()
  }

  async fetchExamTopic() {
    const { exerciseStore: { setTopics, setAnswers, setTotalPage } } = this.props;
    const topics: Array<{ type: string, topic: string, options: Array<string> }> = await getExamTopic()
    const answers: Array<Array<number>> = Array.from({ length: topics.length }, (_, index) => Array.from({ length: topics[index].options.length }, __ => 0))
    const total: number = topics.length;
    setTopics(topics)
    setAnswers(answers)
    setTotalPage(total)
  }

  switchPage(current: number) {
    const { exerciseStore: { setCurrentPage } } = this.props;
    setCurrentPage(current)
  }

  generateTab(): Array<{ title: string }> {
    const { exerciseStore: { topics } } = this.props;
    return Array.from({ length: topics.length }).map((_, index) => ({ title: (index + 1).toString() }))
  }

  switchFontSize(type: number): void {
    const { exerciseStore: { fontSizeId, setFontSize } } = this.props;
    setFontSize(fontSizeId + type)
  }

  render() {
    const { exerciseStore: { currentPage, topics, theme } } = this.props;
    const tabList = this.generateTab();
    return (
      <View className={`exam-container ${theme}`}>
        <AtTabs
          current={currentPage}
          scroll
          tabList={tabList}
          onClick={this.switchPage.bind(this)}>
          {topics.map((_, index) => {
            return (
              <AtTabsPane current={currentPage} index={index} key={index}>
                <Topic number={index} examStore={new exerciseStore()} />
                <Options number={index} examStore={new exerciseStore()} />
              </AtTabsPane>
            )
          })}
        </AtTabs>
        <Status examStore={new exerciseStore()} />
      </View>
    )
  }
}

export default Exam as ComponentType
