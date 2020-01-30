import React from 'react'
import { Component } from '@tarojs/taro'
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
    const { number, exerciseStore: { topicList, fontSize } } = this.props;
    if (!topicList[number]) return;
    const { topicType, topicContent } = topicList[number];
    const tag: string = topicType === 1 ? '单选' : '多选';
    return (
      <View className={`exam-topic ${fontSize}`}>
        <View className='type'>{tag}</View>
        {topicContent}
      </View>
    )
  }
}

export default Topic 
