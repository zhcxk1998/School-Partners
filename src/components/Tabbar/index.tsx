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
          selectedColor='#fa4b2a'
          tabList={[
            { title: '首页', iconType: 'bullet-list' },
            { title: '拍照', iconType: 'camera' },
            { title: '文件夹', iconType: 'folder' }
          ]}
          onClick={onSwitchTab}
          current={current}
        />
      </View>
    )
  }
}

export default Tabbar
