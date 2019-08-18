const router = require('koa-router')()

router.get('/exams', async (ctx) => {
  ctx.body = '12312312'
})

module.exports = router