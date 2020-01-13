const router = require('koa-router')()
const { getJWTPayload } = require('../../utils/token')

router.get('/info', async (ctx) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  ctx.response.status = 200
  ctx.response.body = payload
})

module.exports = router