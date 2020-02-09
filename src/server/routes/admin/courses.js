const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE } = require('../../utils/sql');
const parse = require('../../utils/parse')

router.get('/courses', async (ctx) => {
  const responseData = []
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const res = await query(QUERY_TABLE('course_list'));
    res.map((item, index) => {
      const { id, course_name, is_recommend, course_author, publish_date, course_description } = item
      responseData[index] = {
        id,
        courseName: course_name,
        isRecommend: is_recommend,
        publishDate: publish_date,
        courseAuthor: course_author,
        courseDescription: course_description
      }
    })
    responseBody.code = 200
    responseBody.data = {
      courseList: parse(responseData),
      total: responseData.length
    }
  } catch (e) {
    responseBody.code = 404
    responseBody.data = {
      msg: '无课程信息'
    }
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router