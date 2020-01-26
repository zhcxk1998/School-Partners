const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
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
  websocket
} = require('../routes/client')

client.use(cors())
client.use(bodyParser())
/* 小程序端 */
client.use(routes(router, { course, exercise, contact, chatroom, forum }))
client.ws.use(websocket());

module.exports = client