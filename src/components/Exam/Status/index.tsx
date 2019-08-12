import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtSlider } from 'taro-ui'
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

  handleTouchMove(e): void {
    e.stopPropagation()
  }

  render() {
    const { examStore: { fontSizeId, currentPage, totalPage, settingOpened } } = this.props;
    return (
      <View>
        <View className={`float-layout-overlay ${settingOpened ? 'setting-mass' : ''} `} onClick={this.onSettingClick.bind(this)} />
        <View className={`exam-status ${settingOpened ? 'setting-open' : ''}`} onTouchMove={this.handleTouchMove.bind(this)}>
          <View className='exam-footer'>
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
          <View className='exam-setting'>
            <View className='font-setting at-row'>
              <View className='font-size at-col at-col-2'>A-</View>
              <View className='at-col at-col-8'>
                <AtSlider value={fontSizeId + 1} min={1} max={5}
                  onChange={this.onSliderChange.bind(this)}
                  onChanging={this.onSliderChange.bind(this)}
                  activeColor='#fa4b2a'
                />
              </View>
              <View className='font-size at-col at-col-2'>A+</View>
            </View>
            {/* <View className='background-setting'>
              <View className='background'>

              </View>
              <View className='background'>

              </View>
              <View className='background'>

              </View>
            </View> */}
          </View>
        </View>
      </View>
    )
  }
}

export default Status
