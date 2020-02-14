const { validateNumber } = require('@/admin/utils/formValidate')

export const ExamNameRules = [
  { required: true, message: '请输入考试名称' }
]

export const ExamContentRules = [
  { required: true, message: '请输入考试简介' }
]

export const ExamDifficultyRules = [
  { required: true, message: '请选择考试难度' }
]

export const ExamTypeRules = [
  { required: true, message: '请选择考试类型' }
]

export const ExamTimingModeRules = [
  { required: true, message: '请选择考试计时方式' }
]

export const ExamCountDownRules = [
  { required: true, message: '请输入考试时间安排' },
  { pattern: /^\d*$/, message: '请输入正确的数字' }
]

export const ExamTimeRangeRules = [
  { required: true, message: '请选择考试时间安排' }
]

export const TopicContentRules = [
  { required: true, message: '请选择题目内容' }
]

export const TopicTypeRules = [
  { required: true, message: '请选择题目类型' }
]

export const TopicOptionRules = [
  { required: true, message: '请填写题目选项' }
]

export const TopicAnswerRules = [
  { required: true, message: '请选择题目正确答案' }
]