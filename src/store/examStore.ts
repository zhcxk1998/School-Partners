import { observable, action } from 'mobx'
// import Taro from '@tarojs/taro'

class examStore {
  @observable currentPage: number = 0;
  @observable answers: Array<Array<number>>;

  // @action.bound
  // nextPage(): void {
  //   this.currentPage++;
  // }

  // @action.bound
  // previousPage(): void {
  //   this.currentPage--;
  // }

  @action.bound
  setPage(index: number): void {
    this.currentPage = index;
  }

  @action.bound
  setAnswers(answers: Array<Array<number>>) {
    this.answers = answers;
  }
}

export default examStore