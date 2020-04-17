import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.scss'

interface IProps {
  onSwitchTab: (index: number) => void,
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
            { title: '聊天', iconType: 'message' },
            { title: '考试', iconType: 'edit' },
            { title: '论坛', iconType: 'edit' },
            { title: '个人', iconType: 'user' }
          ]}
          onClick={onSwitchTab}
          current={current}
        />
      </View>
    )
  }
}

export default Tabbar as ComponentType<IProps>
