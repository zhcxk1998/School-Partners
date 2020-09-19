import React, { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'



import './index.scss'

interface IProps {
}

interface IStates {
}

class myClass extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {

  }


  render() {
    return (
      <View className="myclass__container">
        1
      </View>
    )
  }
}

export default myClass as ComponentType