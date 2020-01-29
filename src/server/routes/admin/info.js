const router = require('koa-router')()
const { getJWTPayload } = require('../../utils/token')

router.get('/info', async (ctx) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  const { username } = payload
  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    data: {
      username
    }
  }
})

module.exports = router