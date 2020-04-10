const router = require('koa-router')()
const { query } = require('../../utils/query')
const { getJWTPayload } = require('../../utils/token')
const { QUERY_TABLE } = require('../../utils/sql')

router.get('/dashboard', async (ctx) => {
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const { header: { authorization } } = ctx
    const { userId, classId } = getJWTPayload(authorization)
    const { class_code: classCode, class_member: classMember } = (await query(QUERY_TABLE('class_list', ['id', classId], ['class_code', 'class_member'])))[0]
    const courseList = await query(QUERY_TABLE('course_list', ['class_id', classId]))
    const exerciseList = await query(QUERY_TABLE('exercise_list', ['class_id', classId]))
    const { is_actived: isActived } = (await query(QUERY_TABLE('user_info', ['id', userId], ['is_actived'])))[0]
    const courseCount = courseList.length
    const exerciseCount = exerciseList.length

    responseBody.data = {
      dashboardInfo: {
        classCode: isActived ? classCode : '-',
        classMember: isActived ? classMember : '-',
        courseCount: isActived ? courseCount : '-',
        exerciseCount: isActived ? exerciseCount : '-'
      }
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