const router = require('koa-router')()
const parse = require('../../utils/parse')
const { query } = require('../../utils/query')
const { getEncrypt } = require('../../utils/encrypt')
const { generateToken } = require('../../utils/token')

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  const responseBody = {
    code: 0,
    data: {}
  }

  try {
    const { id: userId } = parse(await query(`select id from user_info where username = '${username}'`))[0]
    const { password: verifySign, salt } = parse(await query(`select password, salt from user_password where user_id = '${userId}'`))[0]

    const sign = getEncrypt(password + salt)
    if (sign === verifySign) {
      responseBody.data.msg = '登陆成功'
      responseBody.data.token = generateToken({ username, userId })
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