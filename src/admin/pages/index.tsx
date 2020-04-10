import { LoadableComponent } from '@/admin/components'

const Login = LoadableComponent(() => import('./Login'))
const Register = LoadableComponent(() => import('./Register'))
const Index = LoadableComponent(() => import('./Index/index'))
const ExerciseList = LoadableComponent(() => import('./ExerciseList'))
const ExercisePublish = LoadableComponent(() => import('./ExercisePublish'))
const ExerciseModify = LoadableComponent(() => import('./ExerciseModify'))
const CourseList = LoadableComponent(() => import('./CourseList'))
const CoursePublish = LoadableComponent(() => import('./CoursePublish'))
const CourseModify = LoadableComponent(() => import('./CourseModify'))
const ExamList = LoadableComponent(() => import('./ExamList'))
const ExamPublish = LoadableComponent(() => import('./ExamPublish'))
const ExamModify = LoadableComponent(() => import('./ExamModify'))
const MarkPaper = LoadableComponent(() => import('./MarkPaper'))
const ClassDashboard = LoadableComponent(() => import('./ClassDashboard'))

export {
  Login,
  Register,
  Index,
  ExerciseList,
  ExercisePublish,
  ExerciseModify,
  CourseList,
  CoursePublish,
  CourseModify,
  ExamList,
  ExamPublish,
  ExamModify,
  MarkPaper,
  ClassDashboard
}