const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const body = require('koa-body')
const cors = require('koa2-cors');
const websockify = require('koa-websocket')

const client = websockify(new Koa());

const game = require('../routes/game/index')

client.use(body({
  multipart: true,
  formidable: {
    multipart: true
  }
}))
client.use(cors())
client.use(bodyParser())
/* 小程序端 */
client.ws.use(game());

module.exports = client
