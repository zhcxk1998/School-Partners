const router = require('koa-router')()
const { query } = require('../utils/query')
const { QUERY_TABLE, INSERT_TABLE, UPDATE_TABLE, DELETE_TABLE } = require('../utils/sql');

router.get('/courses', async (ctx) => {
  const res = await query(QUERY_TABLE('course_list'));
  ctx.response.body = JSON.stringify(res);
})

router.put('/courses', async (ctx) => {
  const data = {
    key: ['course_cid', 'course_name', 'is_recommend'],
    value: ctx.request.body.value
  }
  await query(INSERT_TABLE('course_list', data));
  ctx.response.body = await query(QUERY_TABLE('course_list'));
})

module.exports = router