const router = require('koa-router')()
const {
  query
} = require('../../utils/query')
const axios = require('axios')
const {
  appId,
  appSecret
} = require('../../config/wx_config')
// const { generateToken } = require('../../utils/token')

router.post('/login', async (ctx) => {
  const {
    code,
    nickName,
    avatarUrl
  } = ctx.request.body
  // 这里到时候传入学生真实姓名
  const student_name = 'real_name'
  const {
    data: {
      openid
    }
  } = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  )
  const {
    insertId: studentId
  } = await query(`INSERT INTO student_list(student_name, nick_name, open_id, student_avatar) VALUE('${student_name}','${nickName}','${openid}','${avatarUrl}') ON DUPLICATE KEY UPDATE student_name='${student_name}', nick_name='${nickName}', open_id='${openid}', student_avatar='${avatarUrl}'`)

  // const {
  //   class_id: classId
  // } = await query(`SELECT class_id FROM student_class WHERE student_id = '${studentId+1}'`)[0]

  // 生成token
  ctx.response.body = {
    openid,
    // classId
  }
})

module.exports = router
