import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
  options: Array<string>,
  number: number,
  answers: Array<Array<number>>,
  type: string,
  handleOptionClick: (number: number, index: number) => void
}

interface IState {
}

class Options extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  formatNumber(number: number): string {
    return String.fromCharCode(number + 65)
  }

  render() {
    const { options, number, answers, handleOptionClick, type } = this.props;
    const buttonClassName: string = answers[number].some(_ => _ === 1) ? 'confirm' : 'confirm hide';

    return (
      <View className='exam-options'>
        {options.map((option, index) => {
          // const className: string = index === active ? 'number active' : 'number';
          const optionClassName: string = answers[number][index] === 1 ? 'number active' : 'number';
          return (
            <View className='wrap' key={index} onClick={handleOptionClick.bind(this, number, index, type)}>
              <View className={optionClassName}>{this.formatNumber(index)}</View>
              <View className='content'>{option}</View>
            </View>
          )
        })}
        <View className={buttonClassName}>确认答案</View>
      </View>
    )
  }
}

export default Options
