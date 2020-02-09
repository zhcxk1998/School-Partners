import { LoadableComponent } from '@/admin/components'

const Login = LoadableComponent(() => import('./Login'))
const Register = LoadableComponent(() => import('./Register'))
const Index = LoadableComponent(() => import('./Index/index'))
const ExerciseList = LoadableComponent(() => import('./ExerciseList'))
const ExercisePublish = LoadableComponent(() => import('./ExercisePublish'))
const ExerciseModify = LoadableComponent(() => import('./ExerciseModify'))
const CourseList = LoadableComponent(() => import('./CourseList'))

export {
  Login,
  Register,
  Index,
  ExerciseList,
  ExercisePublish,
  ExerciseModify,
  CourseList
}