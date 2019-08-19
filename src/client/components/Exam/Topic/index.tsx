import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import exerciseStore from '../../../store/exerciseStore'

import './index.scss'

interface IProps {
  number: number,
  exerciseStore: exerciseStore,
}

@inject('exerciseStore')
@observer
class Topic extends Component<IProps, {}> {
  render() {
    const { number, exerciseStore: { topics, fontSize } } = this.props;
    if (!topics[number]) return;
    const { type, topic } = topics[number];
    const tag: string = type === 'radio' ? '单选' : '多选';
    return (
      <View className={`exam-topic ${fontSize}`}>
        <View className='type'>{tag}</View>
        {topic}
      </View>
    )
  }
}

export default Topic
