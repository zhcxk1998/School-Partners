const router = require('koa-router')()
const { getJWTPayload } = require('../../utils/token')
const { query } = require('../../utils/query')

router.get('/info', async (ctx) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  const { username, userId } = payload
  const { is_actived } = (await query(`select is_actived from user_info where id = ${userId}`))[0]
  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    data: {
      username,
      isActived: !!is_actived
    }
  }
})

module.exports = router