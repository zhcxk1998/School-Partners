const router = require('koa-router')()
const {
  query
} = require('../../utils/query')
const {
  getJWTPayload
} = require('../../utils/token')

router.get('/mark/paper/getExercises', async (ctx) => {
  try {
    const {
      authorization
    } = ctx.header

    const {
      classId
    } = getJWTPayload(authorization)

    const {
      exerciseId
    } = ctx.request.query

    const res = await query(`SELECT * FROM exercise_list WHERE id = '${exerciseId}'`)
    const topicList = JSON.parse(res[0].topic_list)
    const uploadExerciseList = []

    topicList.forEach((item, index) => {
      const {
        topicType = 1,
          topicContent = ''
      } = item

      if (topicType === 3) {
        uploadExerciseList.push({
          index,
          topicContent
        })
      }
    })

    ctx.response.status = 200
    ctx.response.body = {
      uploadExerciseList
    }
  } catch (e) {
    console.log(e)
    ctx.response.status = 500
    ctx.response.body = {
      msg: '异常错误'
    }
  }
})

router.get('/mark/paper', async (ctx) => {
  try {
    const {
      authorization
    } = ctx.header
    const {
      classId
    } = getJWTPayload(authorization)
    const {
      exerciseId,
      exerciseIndex
    } = ctx.request.query
    const res = await query(`SELECT * FROM student_list WHERE id IN (SELECT student_id FROM upload_exercise WHERE class_id = '${classId}' AND exercise_id = '${exerciseId}' AND exercise_index = '${exerciseIndex}')`);

    ctx.response.status = 200
    ctx.response.body = {
      exerciseId: +exerciseId,
      exerciseIndex: +exerciseIndex,
      classId,
      studentList: res.map(item => {
        const {
          id,
          student_name,
          nick_name,
          open_id,
          student_avatar
        } = item

        return {
          studentId: id,
          studentName: student_name,
          nickName: nick_name,
          openid: open_id,
          studentAvatar: student_avatar
        }
      })
    }

  } catch (e) {
    console.log(e)
    ctx.response.status = 500
    ctx.response.body = {
      msg: '异常错误'
    }
  }
})

module.exports = router
