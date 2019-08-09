import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
  options: Array<string>
}

interface IState {
  active: number
}

class Options extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      active: -1
    }
  }

  formatNumber(number: number): string {
    return String.fromCharCode(number + 65)
  }

  handleOptionClick(index: number) {
    this.setState({
      active: index
    })
  }

  render() {
    const { options } = this.props;
    const { active } = this.state;
    return (
      <View className='exam-options'>
        {options.map((option, index) => {
          const className: string = index === active ? 'number active' : 'number';
          return (
            <View className='wrap' key={index} onClick={this.handleOptionClick.bind(this, index)}>
              <View className={className}>{this.formatNumber(index)}</View>
              <View className='content'>{option}</View>
            </View>
          )
        })}
        <View className='confirm'>确认答案</View>
      </View>
    )
  }
}

export default Options
