const koaJwt = require('koa-jwt')

const verifyToken = () => {
  return koaJwt({ secret: 'zhcxk1998' }).unless({
    path: [
      /login/,
      /register/
    ]
  })
}

module.exports = verifyToken