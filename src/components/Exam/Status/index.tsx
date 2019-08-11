import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtSlider, AtFloatLayout } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import examStore from '../../../store/examStore'

import './index.scss'
import 'taro-ui/dist/style/components/flex.scss';

interface IProps {
  examStore: examStore
}

@inject('examStore')
@observer
class Status extends Component<IProps, {}> {

  onSettingClick(): void {
    const { examStore: { setSettingOpened } } = this.props;
    setSettingOpened()
  }

  onSliderChange({ value }): void {
    const { examStore: { setFontSize } } = this.props;
    setFontSize(value - 1);
  }

  render() {
    const { examStore: { fontSizeId, currentPage, totalPage, settingOpened } } = this.props;
    return (
      <View>
        <View className='exam-status'>
          <View className='star'>
            <AtIcon value='star' size='16' color='#666'></AtIcon>
            <Text className='tag'>收藏</Text>
          </View>
          <View className='setting' onClick={this.onSettingClick.bind(this)}>
            <AtIcon value='settings' size='16' color='#1296db'></AtIcon>
            <Text className='tag'>设置</Text>
          </View>
          <View className='progress'>
            <AtIcon value='numbered-list' size='16' color='#fa4b2a'></AtIcon>
            <Text className='tag'>{currentPage + 1}</Text>/{totalPage}
          </View>
        </View>
        <AtFloatLayout isOpened={settingOpened} title='页面设置' onClose={this.onSettingClick.bind(this)}>
          <View className='at-row setting-wrap'>
            <View className='font-size at-col at-col-3'><View className='title'>字体</View><View>(分为1-5挡)</View></View>
            <View className='at-col at-col-9'>
              <AtSlider value={fontSizeId + 1} showValue min={1} max={5} onChanging={this.onSliderChange.bind(this)} />
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default Status
