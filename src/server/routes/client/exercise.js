const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE } = require('../../utils/sql');
const parse = require('../../utils/parse')

router.get('/exercises', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('exercise_list'));
  res.map((item, index) => {
    const { id, exercise_name, exercise_content, is_hot, finish_count, total_count, exercise_difficulty, exercise_type } = item
    response[index] = {
      exerciseId: id,
      exerciseName: exercise_name,
      exerciseContent: exercise_content,
      isHot: is_hot,
      finsihCount: finish_count,
      totalCount: total_count,
      exerciseDifficulty: exercise_difficulty,
      exerciseType: exercise_type
    }
  })
  ctx.response.body = parse(response);
})

router.get('/exercises/:id', async (ctx) => {
  const id = ctx.params.id
  const res = await query(`SELECT exercise_name, topic_list FROM exercise_list WHERE id = ${id}`)
  const { exercise_name, topic_list } = res[0]
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    responseBody.data = {
      exerciseName: exercise_name,
      topicList: JSON.parse(topic_list)
    }
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '异常错误'
    responseBody.code = 500
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router