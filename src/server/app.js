const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const websockify = require('koa-websocket')

const router = new Router()
const app = websockify(new Koa());

const routes = require('./routes/routes')
const {
  course,
  exercise,
  contact,
  chatroom,
  forum,
  websocket
} = require('./routes/client')
const {
  login
} = require('./routes/admin')

app.use(cors())
app.use(bodyParser())
app.use(routes(router, { course, exercise, contact, chatroom, forum }))
app.use(routes(router, { login }))
app.ws.use(websocket);

module.exports = app