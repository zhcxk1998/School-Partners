const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE, INSERT_TABLE } = require('../../utils/sql');
const parse = require('../../utils/parse')

router.get('/courses', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('course_list'));
  res.map((item, index) => {
    const { id, course_name, is_recommend } = item
    response[index] = {
      id,
      courseName: course_name,
      isRecommend: is_recommend
    }
  })
  ctx.response.body = parse(response);
})

router.get('/courses/:id', async (ctx) => {
  const course_id = ctx.params.id
  const res = await query(`SELECT * FROM course_list WHERE id = ${course_id}`);
  const { id, course_author, publish_date, course_views, course_description, course_steps, course_rate } = res[0]
  const date = new Date(Number(publish_date))
  const year = date.getFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getDate()
  const response = {
    id,
    courseAuthor: course_author,
    publishDate: `${year}.${month}.${day}`,
    courseViews: course_views,
    courseDescription: course_description,
    courseSteps: JSON.parse(course_steps),
    courseRate: course_rate
  }
  ctx.response.body = response;
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