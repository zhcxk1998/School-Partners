import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import Topic from '../../components/Exam/Topic/index'
import Options from '../../components/Exam/Options/index'
import Status from '../../components/Exam/Status/index'

import './index.scss'


interface IProps {

}

interface IState {
  type: string,
  topic: string,
  options: Array<string>
}

class Exam extends Component<IProps, IState> {

  config: Config = {
    navigationBarTitleText: '做题'
  }

  constructor(props) {
    super(props);
    this.state = {
      type: '单选',
      topic: '快速原型是利用原型辅助软件开发的一种新思想，它是在研究(  )的方法和技术中产生的',
      options: ['软件危机在20世纪70年代末期全面爆发', '当前先进的软件工程方法已经解决了软件危机的问题', '软件危机是指在计算机软件的开发和维护过程中遇到的一系列严重问题软件危机是指在计算机软件的开发和维护过程中遇到的一系列严重问题', '软件危机是指在软件产品中存在一系列的质量问题']
    }
  }

  render() {
    const { type, topic, options } = this.state;
    return (
      <View className='exam-container'>
        <View className='exam-timer'>

        </View>
        <Topic type={type} topic={topic} />
        <Options options={options} />
        <Status></Status>
      </View>
    )
  }
}

export default Exam as ComponentType
