import { observable, action } from 'mobx'
// import Taro from '@tarojs/taro'

class examStore {
  @observable currentPage: number = 0;
  @observable totalPage: number = 0;
  @observable topics: Array<{ type: string, topic: string, options: Array<string> }> = [];
  @observable answers: Array<Array<number>> = [];

  @action.bound
  setCurrentPage(current: number): void {
    this.currentPage = current;
  }

  @action.bound
  setTotalPage(total: number): void {
    this.totalPage = total;
  }

  @action.bound
  setTopics(topics: Array<{ type: string, topic: string, options: Array<string> }>) {
    this.topics = topics;
  }

  @action.bound
  setAnswers(answers: Array<Array<number>>) {
    this.answers = answers;
  }

  @action.bound
  handleOptionClick(number: number, index: number): void {
    if (this.topics[number].type === 'radio') {
      this.answers[number].fill(0)
    }
    this.answers[number][index] = this.answers[number][index] === 1 ? 0 : 1
  }
}

export default examStore