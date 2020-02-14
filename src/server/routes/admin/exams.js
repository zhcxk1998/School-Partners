const router = require('koa-router')()
const { query } = require('../../utils/query')
const { INSERT_TABLE } = require('../../utils/sql');
const { generateRandomCode } = require('../../utils/generateRandomCode')

router.post('/exams', async (ctx) => {
  const {
    examName,
    examContent,
    examType,
    examDifficulty,
    examTimingMode,
    examTime,
    topicList
  } = ctx.request.body
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    await query(INSERT_TABLE('exam_list'), {
      exam_name: examName,
      exam_content: examContent,
      exam_type: examType,
      exam_difficulty: examDifficulty,
      timing_mode: examTimingMode,
      start_time: examTimingMode === 1 ? 0 : examTime[0],
      end_time: examTimingMode === 1 ? 0 : examTime[1],
      count_down: examTimingMode === 1 ? examTime : 0,
      topic_list: JSON.stringify(topicList),
      publish_date: new Date().getTime(),
      exam_code: generateRandomCode()
    })
    responseBody.data.msg = '新增成功'
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