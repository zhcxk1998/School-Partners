import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'


import './index.scss'

interface IProps {
}

interface IState {
}

class Battle extends Component<IProps, IState> {
  constructor(props) {
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