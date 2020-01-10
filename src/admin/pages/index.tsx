import LoadableComponent from '../components/LoadableComponent'

const Login = LoadableComponent(() => import('./Login'))
const Index = LoadableComponent(() => import('./Index/index'))

export {
  Login,
  Index
}