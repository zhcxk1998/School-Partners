import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'

const themeList: Array<{ theme: string, title: string, icon: string }> = [
  {
    theme: 'light',
    title: '日间模式',
    icon: 'icon-light'
  }, {
    theme: 'dark',
    title: '夜间模式',
    icon: 'icon-dark'
  }, {
    theme: 'care',
    title: '护眼模式',
    icon: 'icon-care'
  }
];

class examStore {
  @observable fontSize: string = 'normal';
  @observable fontSizeId: number = 2;
  @observable settingOpened: boolean = false;
  @observable theme: string = 'light';
  @observable themeList: Array<{ theme: string, title: string, icon: string }> = themeList

  @observable currentPage: number = 0;
  @observable totalPage: number = 0;
  @observable topics: Array<{ type: string, topic: string, options: Array<string> }> = [];
  @observable answers: Array<Array<number>> = [];

  @action.bound
  setFontSize(sizeId: number = 2): void {
    if (sizeId > 4 || sizeId < 0) return;
    this.fontSizeId = sizeId;
    this.fontSize = ['smaller', 'small', 'normal', 'large', 'larger'][sizeId]
  }

  @action.bound
  setTheme(theme: string = 'light'): void {
    this.theme = theme;
  }

  @action.bound
  setSettingOpened(): void {
    this.settingOpened = !this.settingOpened
  }

  @action.bound
  setCurrentPage(current: number = 0): void {
    this.currentPage = current;
  }

  @action.bound
  setTotalPage(total: number = 0): void {
    this.totalPage = total;
  }

  @action.bound
  setTopics(topics: Array<{ type: string, topic: string, options: Array<string> }> = []) {
    this.topics = topics;
  }

  @action.bound
  setAnswers(answers: Array<Array<number>> = []) {
    this.answers = answers;
  }

  @action.bound
  handleOptionClick(number: number, index: number): void {
    if (this.topics[number].type === 'radio') {
      this.answers[number].fill(0)
    }
    this.answers[number][index] = this.answers[number][index] === 1 ? 0 : 1
  }

  @action.bound
  handleConfirmClick(): void {
    if (this.currentPage + 1 < this.totalPage) {
      this.currentPage += 1;
    } else {
      const emptyPage: number = this.answers.findIndex((answer) => answer.every(option => option === 0));
      const isFinished: boolean = emptyPage === -1;
      if (!isFinished) {
        this.currentPage = emptyPage
      } else {
        /* 处理答案 */
      }

      Taro.showToast({
        title: `${isFinished ? 'ok' : '还没有完成哦！'}`,
        icon:'loading'
      })
    }
  }
}

export default examStore