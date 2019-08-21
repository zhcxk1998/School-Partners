import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

interface UserInfo {
  avatarUrl: string,
  city: string,
  country: string,
  gender: number,
  language: string,
  nickName: string,
  province: string
}

class infoStore {
  @observable userInfo: UserInfo = {
    avatarUrl: '',
    city: '',
    country: '',
    gender: -1,
    language: '',
    nickName: '',
    province: ''
  }

  @action.bound
  getUserInfo(): any {
    return new Promise(async (resolve, reject) => {
      const { userInfo } = await Taro.getUserInfo()
      this.userInfo = userInfo
      resolve()
    })
  }
}

export default infoStore