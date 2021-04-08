import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import exerciseStore from '../../../store/exerciseStore'


import './index.scss'

const { prefix } = require('../../../config/common')

interface IProps {
  number: number,
  exerciseStore: exerciseStore
}

interface IStates {
  uploadImg: string
}

@inject('exerciseStore')
@observer
class Options extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      uploadImg: ''
    }
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

  handleImageUpload(): void {
    const { number, exerciseStore: { exerciseId } } = this.props;

    Taro.chooseImage({
      count: 1,
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        const openid = Taro.getStorageSync('openid')

        this.setState({
          uploadImg: filePath
        })

        Taro.uploadFile({
          url: `${prefix}/upload`,
          filePath,
          name: 'files',
          formData: {
            openid,
            exerciseId,
            exerciseIndex: number
          },
          success: (res) => {
            console.log(res)
          }
        })
      },
      fail: () => {

      }
    })
  }

  render() {
    const { number, exerciseStore: { topicList, optionStatus, fontSize, isFinished, isSubmitted } } = this.props;
    if (!optionStatus[number] || !topicList[number]) return;
    const { topicOptions, isUpload = false } = topicList[number];
    const buttonClassName: string = isUpload || optionStatus[number].some(_ => _ === 1) && !isSubmitted ? 'confirm' : 'confirm hide';
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
        {!isUpload ? topicOptions.map((topicOption, index) => {
          const { option, id } = topicOption
          const optionClassName: string = optionClassNames[optionStatus[number][index]]
          return (
            <View className='wrap' key={index} onClick={this.onOptionClick.bind(this, number, index)}>
              <View className={optionClassName}>{this.formatNumber(index)}</View>
              <View className={`content ${fontSize}`}>{option}</View>
            </View>
          )
        }) : (
          <View className="uploader__container">
            请在此上传图片:
            <View className="uploader__wrapper" onClick={this.handleImageUpload.bind(this)}>
              {!this.state.uploadImg ?
                <View className="uploader__icon">
                  +
                </View> :
                <View className="uploader__icon uploader__img" style={{ backgroundImage: `url(${this.state.uploadImg})` }}>

                </View>}

            </View>
          </View>
        )}
        <View className={buttonClassName} onClick={this.onConfirmClick.bind(this)}>{buttonName}</View>
      </View>
    )
  }
}

export default Options as ComponentType<IProps>
