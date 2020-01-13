const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const websockify = require('koa-websocket')
const routes = require('./routes/routes')

const router = new Router()
const app = websockify(new Koa());

const {
  verifyToken,
  interceptToken
} = require('./middleware')
const {
  course,
  exercise,
  contact,
  chatroom,
  forum,
  websocket
} = require('./routes/client')
const {
  login,
  info
} = require('./routes/admin')

app.use(cors())
app.use(bodyParser())
/* 拦截token */
app.use(interceptToken())
app.use(verifyToken())
/* 小程序端 */
app.use(routes(router, { course, exercise, contact, chatroom, forum }))
app.ws.use(websocket());
/* 管理端 */
app.use(routes(router, { login, info }))

module.exports = app