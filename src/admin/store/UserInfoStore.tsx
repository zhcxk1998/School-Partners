import { action, observable, configure, runInAction } from 'mobx';
import http from '@/admin/utils/http'

configure({ enforceActions: 'observed' });

class UserInfoStore {
  @observable username = ''
  @observable isActived = false

  @action.bound
  async setUserInfo() {
    const { data: { username, isActived } } = await http.get('/info')
    runInAction(() => {
      this.username = username
      this.isActived = isActived
    })
  }

  @action.bound
  setIsActived(isActived: boolean) {
    this.isActived = isActived
  }
}

export default UserInfoStore;
