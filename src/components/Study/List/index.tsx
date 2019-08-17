import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {

}

interface IState {

}

class List extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidShow() {

  }

  render() {
    const list: Array<{ title: string, content: string, link: string }> = [
      { title: '软件工程第一章', content: '本章对软件、软件工程、软件工程课程、软件工程学科体系进行了定义。', link: '/pages/exam/index' },
      { title: 'UML建模', content: '深度了解UML建模之间的各种关系', link: '' },
      { title: '前端面试必备', content: '收录了各大厂商的前端面试资源', link: '' },
      { title: 'Linux从入门到精通', content: '内含各种常见Linux命令，助您巩固基础', link: '' },
      { title: '计算机网络', content: '常见的Http协议，浏览器头文件等测试题', link: '' },
    ];

    return (
      <View className='list-container'>
        {list.map((item, index) => {
          const { title, content, link } = item;
          return (
            <View className='list-wrap' key={index} onClick={() => { Taro.navigateTo({ url: link }) }}>
              <View className='list-preview'>
                <View className='iconfont icon-tiku'></View>
              </View>
              <View className='list-info'>
                <View className='title'>{title}</View>
                <View className='content'>{content}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default List 
