const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const routes = require('../routes/routes')

const router = new Router()
const admin = new Koa();

const {
  verifyToken,
  interceptToken
} = require('../middleware')
const {
  login,
  info,
  register,
  exercises
} = require('../routes/admin')

admin.use(cors())
admin.use(bodyParser())
/* 拦截token */
admin.use(interceptToken())
admin.use(verifyToken())
/* 管理端 */
admin.use(routes(router, { login, info, register, exercises }))

module.exports = admin