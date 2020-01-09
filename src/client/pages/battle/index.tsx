import React, { ComponentType } from 'react'
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
}

interface IState {
}

class Battle extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: ''
    }
  }

  async componentWillMount() {

  }

  render() {
    return (
      <View>
        battle
      </View>
    )
  }
}

export default Battle as ComponentType