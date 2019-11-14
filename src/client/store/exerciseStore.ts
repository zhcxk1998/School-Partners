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

class exerciseStore {
  @observable fontSize: string = 'normal';
  @observable fontSizeId: number = 2;
  @observable settingOpened: boolean = false;
  @observable theme: string = 'light';
  @observable themeList: Array<{ theme: string, title: string, icon: string }> = themeList

  @observable emptyPage: number = 0;
  @observable isFinished: boolean = false
  @observable isSubmitted: boolean = false
  @observable currentPage: number = 0;
  @observable totalPage: number = 0;
  @observable exerciseCid: string = '';
  @observable exerciseDetail: Array<{ type: string, topic: string, options: Array<string> }> = [];
  // 题目的标准答案
  @observable exerciseAnswers: Array<Array<number>> = [];
  // 用户选择的答案
  @observable userAnswers: Array<Array<number>> = []

  @action.bound
  resetExerciseDetail(): void {
    this.exerciseDetail = []
    this.exerciseAnswers = []
    this.userAnswers = []
    this.exerciseAnswers = []
    this.currentPage = 0
    this.totalPage = 0
    this.emptyPage = 0
    this.isFinished = false
    this.isSubmitted = false
  }

  @action.bound
  getExerciseDetail(cid: string): any {
    return new Promise(async (resolve, reject) => {
      await Taro.navigateTo({
        url: '/client/pages/exerciseDetail/index'
      })
      Taro.showLoading({
        title: '加载中...'
      })
      const { data } = await Taro.request({
        url: `http://localhost:3000/exercises/${cid}`,
        method: 'GET',
      })
      const detailList = data.detail_list
      const answerList = Array.from({ length: detailList.length }, (_, index) => Array.from({ length: detailList[index].options.length }, __ => 0))

      this.exerciseDetail = detailList
      this.userAnswers = answerList
      this.exerciseAnswers = [...answerList]
      // this.exerciseAnswers = JSON.parse(JSON.stringify(this.userAnswers))
      // Object.assign(this.exerciseAnswers,this.userAnswers)
      this.exerciseAnswers.map((exercise, index) => {
        exercise.map((_, idx) => {
          if (data.detail_answers[index].search(idx + '') !== -1) {
            exercise[idx] = 1
          }
        })
      })
      this.totalPage = detailList.length
      Taro.hideLoading()
      resolve()
    })
  }

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
  handleOptionClick(number: number, index: number): void {
    if (this.isSubmitted) return
    if (this.exerciseDetail[number].type === 'radio') {
      this.userAnswers[number].fill(0)
    }
    this.userAnswers[number][index] = this.userAnswers[number][index] === 1 ? 0 : 1
    this.emptyPage = this.userAnswers.findIndex((answer) => answer.every(option => option === 0));
    this.isFinished = this.emptyPage === -1
  }

  @action.bound
  handleConfirmClick(): void {
    if (this.isSubmitted) return
    if (!this.isFinished) {
      this.currentPage = this.emptyPage
    }
    else {
      /* 处理答案 */
      this.isSubmitted = true
      this.userAnswers.map((answer, answerIndex) => {
        answer.map((option, optionIndex) => {
          const correctAnswer = this.exerciseAnswers[answerIndex][optionIndex]
          if (option !== correctAnswer) {
            this.userAnswers[answerIndex][optionIndex] = correctAnswer - option
          }
        })
      })
      this.currentPage = 0
      Taro.showToast({
        title: 'ok',
        icon: 'none'
      })
    }
  }
}

export default exerciseStore