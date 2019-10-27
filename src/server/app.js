const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const websockify = require('koa-websocket')

const router = new Router()
const app = websockify(new Koa());

const routes = require('./routes/routes')
const course = require('./routes/course')
const exercise = require('./routes/exercise')
const contact = require('./routes/contact')
const chatroom = require('./routes/chatroom')
const websocket = require('./routes/socket')

app.use(cors())
app.use(bodyParser())
app.use(routes(router, { course, exercise, contact, chatroom }))
app.ws.use(websocket);

module.exports = app