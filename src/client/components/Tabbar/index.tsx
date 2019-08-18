import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.scss'

interface IProps {
  onSwitchTab: (object) => void,
  current: number
}

class Tabbar extends Component<IProps, {}> {
  render() {
    const { current, onSwitchTab } = this.props;
    return (
      <View>
        <AtTabBar
          fixed
          selectedColor='#1890ff'
          tabList={[
            { title: '首页', iconType: 'bullet-list' },
            { title: '对战', iconType: 'lightning-bolt' },
            { title: '个人', iconType: 'home' }
          ]}
          onClick={onSwitchTab}
          current={current}
        />
      </View>
    )
  }
}

export default Tabbar
