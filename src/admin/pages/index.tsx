import LoadableComponent from '../components/LoadableComponent'

const Login = LoadableComponent(() => import('./Login'))
const Register = LoadableComponent(() => import('./Register'))
const Index = LoadableComponent(() => import('./Index/index'))

export {
  Login,
  Register,
  Index
}