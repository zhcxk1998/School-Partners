const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const body = require('koa-body')
const cors = require('koa2-cors');
const websockify = require('koa-websocket')
const routes = require('../routes/routes')

const router = new Router()
const client = websockify(new Koa());

const {
  course,
  exercise,
  contact,
  chatroom,
  forum,
  websocket,
  login,
  classes,
  upload
} = require('../routes/client')

client.use(body({
  multipart: true,
  formidable: {
    multipart: true
  }
}))
client.use(cors())
client.use(bodyParser())
/* 小程序端 */
client.use(routes(router, {
  course,
  exercise,
  contact,
  chatroom,
  forum,
  login,
  classes,
  upload
}))
client.ws.use(websocket());

module.exports = client
