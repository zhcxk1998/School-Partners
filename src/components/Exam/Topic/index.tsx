import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import examStore from '../../../store/examStore'

import './index.scss'

interface IProps {
  number: number,
  examStore: examStore,
}

@inject('examStore')
@observer
class Topic extends Component<IProps, {}> {
  render() {
    const { number, examStore: { topics } } = this.props;
    if (!topics[number]) return;
    const { type, topic } = topics[number];
    const tag: string = type === 'radio' ? '单选' : '多选';
    return (
      <View className='exam-topic'>
        <View className='type'>{tag}</View>
        {topic}
      </View>
    )
  }
}

export default Topic
