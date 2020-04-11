const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE, INSERT_TABLE, UPDATE_TABLE_MULTI } = require('../../utils/sql');
const { getJWTPayload } = require('../../utils/token')
const parse = require('../../utils/parse')

router.get('/courses', async (ctx) => {
  const responseData = []
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const { authorization } = ctx.header
    const { classId } = getJWTPayload(authorization)
    const res = await query(QUERY_TABLE('course_list', ['class_id', classId]));
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

router.get('/courses/:id', async (ctx) => {
  const { id: courseId } = ctx.params
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const res = await query(`SELECT * FROM course_list WHERE id = ${courseId}`);
    const { id, course_name, is_recommend, is_public, course_author, publish_date, course_description, course_rate, course_steps } = res[0]
    responseBody.data = {
      id,
      courseName: course_name,
      isRecommend: !!is_recommend,
      isPublic: !!is_public,
      publishDate: parseInt(publish_date) || 0,
      courseAuthor: course_author,
      courseDescription: course_description,
      courseRate: course_rate,
      courseSteps: course_steps ? JSON.parse(course_steps) : []
    }
    responseBody.code = 200
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

router.post('/courses', async (ctx) => {
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const { header: { authorization } } = ctx
    const {
      courseName,
      courseDescription,
      courseAuthor,
      courseRate,
      isRecommend,
      isPublic,
      stepList
    } = ctx.request.body
    const { classId } = getJWTPayload(authorization)
    await query(INSERT_TABLE('course_list'), {
      course_name: courseName,
      course_description: courseDescription,
      course_author: courseAuthor,
      course_rate: courseRate,
      is_recommend: isRecommend ? 1 : 0,
      is_public: isPublic ? 1 : 0,
      course_steps: JSON.stringify(stepList),
      publish_date: new Date().getTime(),
      class_id: classId
    })
    responseBody.data.msg = '新增成功'
    responseBody.code = 200
  } catch (e) {
    console.log(e)
    responseBody.data.msg = '异常错误'
    responseBody.code = 500
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

router.delete('/courses/:id', async (ctx) => {
  const id = ctx.params.id
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    await query(`DELETE FROM course_list WHERE id = ${id}`)
    responseBody.data.msg = '删除成功'
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '无此课程'
    responseBody.code = 404
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

router.delete('/courses', async (ctx) => {
  const deleteIdList = ctx.request.body
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    await Promise.all(deleteIdList.map(async (deleteId) => {
      await query(`DELETE FROM course_list WHERE id = ${deleteId}`)
    }))
    responseBody.data.msg = '删除成功'
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '无此课程'
    responseBody.code = 404
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

router.put('/courses/:id', async (ctx) => {
  const { id: courseId } = ctx.params
  const {
    courseName,
    courseDescription,
    courseAuthor,
    courseRate,
    isRecommend,
    isPublic,
    stepList
  } = ctx.request.body
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    await query(UPDATE_TABLE_MULTI('course_list', { primaryKey: 'id', primaryValue: courseId }, {
      course_name: courseName,
      course_description: courseDescription,
      course_author: courseAuthor,
      course_rate: courseRate,
      is_recommend: isRecommend ? 1 : 0,
      is_public: isPublic ? 1 : 0,
      course_steps: JSON.stringify(stepList)
    }))
    responseBody.data.msg = '修改成功'
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