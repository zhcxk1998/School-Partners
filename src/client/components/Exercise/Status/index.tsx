import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import exerciseStore from '../../../store/exerciseStore'

import './index.scss'
import 'taro-ui/dist/style/components/flex.scss';

interface IProps {
  exerciseStore: exerciseStore
}

@inject('exerciseStore')
@observer
class Status extends Component<IProps, {}> {

  handleSettingClick(): void {
    const { exerciseStore: { setSettingOpened } } = this.props;
    setSettingOpened()
  }

  handleSliderChange({ value }): void {
    const { exerciseStore: { setFontSize } } = this.props;
    setFontSize(value - 1);
  }

  handleThemeChange(themeId: number): void {
    const { exerciseStore: { themeList, setTheme } } = this.props;
    setTheme(themeList[themeId].theme)
  }

  handleTouchMove(e): void {
    e.stopPropagation()
  }

  render() {
    const { exerciseStore: { fontSizeId, theme, themeList, currentPage, totalPage, settingOpened } } = this.props;
    return (
      <View>
        <View className={`float-layout-overlay ${settingOpened ? 'setting-mass' : ''} `} onClick={this.handleSettingClick.bind(this)} />
        <View className={`exam-status ${theme} ${settingOpened ? 'setting-open' : ''}`} onTouchMove={this.handleTouchMove.bind(this)}>
          <View className='exam-footer'>
            <View className='star'>
              <View className='iconfont icon-star'></View>
              <Text className='tag'>收藏</Text>
            </View>
            <View className='setting' onClick={this.handleSettingClick.bind(this)}>
              <View className='iconfont icon-setting'></View>
              <Text className='tag'>设置</Text>
            </View>
            <View className='progress'>
              <View className='iconfont icon-list'></View>
              <Text className='tag'>{currentPage + 1}</Text>/{totalPage}
            </View>
          </View>
          <View className='exam-setting'>
            <View className='font-setting at-row'>
              <View className='font-size at-col at-col-2'>A-</View>
              <View className='at-col at-col-8'>
                <AtSlider value={fontSizeId + 1} min={1} max={5}
                  onChange={this.handleSliderChange.bind(this)}
                  onChanging={this.handleSliderChange.bind(this)}
                  activeColor='#66a6ff'
                />
              </View>
              <View className='font-size at-col at-col-2'>A+</View>
            </View>
            <View className='theme-setting'>
              {themeList.map((item, index) => {
                const { theme, title, icon } = item;
                return (
                  <View className={`theme-wrap ${theme === themeList[index].theme ? 'active' : ''}`} key={index} onClick={this.handleThemeChange.bind(this, index)}>
                    <View className={`theme-icon`}>
                      <View className={`${icon} iconfont`}></View>
                    </View>
                    <View>{title}</View>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Status as ComponentType
