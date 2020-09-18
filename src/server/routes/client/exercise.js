const router = require('koa-router')()
const {
  query
} = require('../../utils/query')
const {
  QUERY_TABLE
} = require('../../utils/sql');
const parse = require('../../utils/parse')

router.get('/exercises', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('exercise_list'));
  res.map((item, index) => {
    const {
      id,
      exercise_name,
      exercise_content,
      is_hot,
      finish_count,
      total_count,
      exercise_difficulty,
      exercise_type
    } = item
    response[index] = {
      id,
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
  const {
    exercise_name,
    topic_list
  } = res[0]
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

router.put('/exercises/score', async (ctx) => {
  const body = ctx.request.body
  const {
    openid,
    score,
    exerciseId
  } = body

  try {
    const studentInfo = await query(`SELECT id, student_name, nick_name FROM student_list WHERE open_id = '${openid}'`)
    const {
      id = 0
    } = studentInfo[0] || []

    const record = await query(`SELECT id FROM exercise_score WHERE exercise_id = ${exerciseId} AND student_id = ${id}`)
    const isRecordExist = record.length !== 0

    if (isRecordExist) {
      await query(`UPDATE exercise_score SET student_score = ${score} WHERE exercise_id = ${exerciseId} AND student_id = ${id}`)
    } else {
      await query(`INSERT INTO exercise_score(exercise_id, student_id, student_score) VALUE(${exerciseId},${id},${score})`)
    }

    ctx.response.body = {
      code: 200,
      status: true,
      data: {

      }
    }
    ctx.response.status = 200
  } catch (e) {
    ctx.response.body = {
      code: 500,
      data: {
        msg: '异常错误'
      }
    }
    ctx.response.status = 500
  }
})

router.get('/exercises-rank', async (ctx) => {
  const res = await query(`SELECT count(exercise_id) as count, sum(student_score) as total, student_id, student_name, nick_name, student_avatar FROM exercise_score left join student_list on exercise_score.student_id = student_list.id GROUP BY student_id ORDER BY count DESC`)
  ctx.response.body = {
    rankList: res.map(item => {
      const {
        count,
        total,
        student_id,
        student_name,
        nick_name,
        student_avatar
      } = item
      return {
        count,
        total,
        studentId: student_id,
        studentName: student_name,
        studentAvatar: student_avatar,
        nickName: nick_name,
        correctRate: parseFloat((total / (count * 100)).toFixed(4)) * 100 + '%'
      }
    })
  };
})

module.exports = router
