import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
  type: string,
  topic: string
}

class Topic extends Component<IProps, {}> {

  static defaultProps = {
    type: '未知',
    topic: '题目正在生成...'
  }

  render() {
    const { type, topic } = this.props;
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
