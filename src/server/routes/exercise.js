const router = require('koa-router')()
const { query } = require('../utils/query')
const { QUERY_TABLE, INSERT_TABLE, UPDATE_TABLE, DELETE_TABLE } = require('../utils/sql');
const parse = require('../utils/parse')

router.get('/exercises', async (ctx) => {
  const res = await query(QUERY_TABLE('exercise_list'));
  ctx.response.body = parse(res);
})

router.get('/exercises/:cid', async (ctx) => {
  const cid = ctx.params.cid
  const res = await query(`SELECT * FROM exercise_detail WHERE exercise_cid = ${cid}`)
  const isExist = res.length === 0
  if (isExist) {
    ctx.response.status = 404
    ctx.response.body = {
      error: 'exercise is not existed'
    }
  }
  else {
    ctx.response.body = parse(res)[0]
  }
})

module.exports = router