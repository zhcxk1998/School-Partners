import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import exerciseStore from '../../../store/exerciseStore'

import './index.scss'

interface IProps {
  number: number,
  exerciseStore: exerciseStore
}

@inject('exerciseStore')
@observer
class Options extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  formatNumber(number: number): string {
    return String.fromCharCode(number + 65)
  }

  onOptionClick(number: number, index: number): void {
    const { exerciseStore: { handleOptionClick } } = this.props;
    handleOptionClick(number, index);
  }

  onConfirmClick(): void {
    const { exerciseStore: { handleConfirmClick } } = this.props;
    handleConfirmClick();
  }

  render() {
    const { number, exerciseStore: { topicList, optionStatus, fontSize, isFinished, isSubmitted } } = this.props;
    if (!optionStatus[number] || !topicList[number]) return;
    const { topicOptions } = topicList[number];
    const buttonClassName: string = optionStatus[number].some(_ => _ === 1) && !isSubmitted ? 'confirm' : 'confirm hide';
    const buttonName: string = isFinished ? '完成答题' : '下一题'
    const optionClassNames = {
      "-2": "number error",
      "-1": "number omit",
      "0": "number",
      "1": "number active",
      "2": "number correct"
    }
    return (
      <View className='exam-options'>
        {topicOptions.map((topicOption, index) => {
          const { option, id } = topicOption
          const optionClassName: string = optionClassNames[optionStatus[number][index]]
          return (
            <View className='wrap' key={index} onClick={this.onOptionClick.bind(this, number, index)}>
              <View className={optionClassName}>{this.formatNumber(index)}</View>
              <View className={`content ${fontSize}`}>{option}</View>
            </View>
          )
        })}
        <View className={buttonClassName} onClick={this.onConfirmClick.bind(this)}>{buttonName}</View>
      </View>
    )
  }
}

export default Options as ComponentType<IProps>
