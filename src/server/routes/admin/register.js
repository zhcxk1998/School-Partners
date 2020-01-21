const router = require('koa-router')()
const { query } = require('../../utils/query')
const { INSERT_TABLE } = require('../../utils/sql')
const { getRandomSalt, getEncrypt } = require('../../utils/encrypt')
const { generateToken } = require('../../utils/token')

router.post('/register', async (ctx) => {
  const { username, password, phone, email } = ctx.request.body
  const responseBody = {
    code: 0,
    data: {}
  }

  try {
    const { insertId: user_id } = await query(INSERT_TABLE('user_info'), { username, phone, email });
    const salt = getRandomSalt()
    const encryptPassword = getEncrypt(password + salt)
    await query(INSERT_TABLE('user_password'), {
      user_id,
      password: encryptPassword,
      salt
    })
    responseBody.data.msg = '注册成功'
    responseBody.data.token = generateToken({ username })
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '用户名已存在'
    responseBody.code = 404
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router