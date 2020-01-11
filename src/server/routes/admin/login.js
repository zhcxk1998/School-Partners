const router = require('koa-router')()
const crypto = require('crypto')
const encrypt = require('../../utils/encrypt')
const parse = require('../../utils/parse')
const { query } = require('../../utils/query')

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  const md5 = crypto.createHash('md5')
  md5.update(password + encrypt)

  const sign = md5.digest('hex')
  const responseBody = {
    code: 0,
    data: {}
  }

  try {
    const { id: userId } = parse(await query(`select id from user_info where username = '${username}'`))[0]
    const { password: verifySign } = parse(await query(`select password from user_password where user_id = '${userId}'`))[0]
    if (sign === verifySign) {
      responseBody.data.msg = '登陆成功'
      responseBody.code = 200
    } else {
      responseBody.data.msg = '用户名或密码错误'
      responseBody.code = 401
    }
  } catch (e) {
    responseBody.data.msg = '用户名不存在'
    responseBody.code = 404
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router