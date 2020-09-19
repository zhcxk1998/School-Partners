const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE, INSERT_TABLE } = require('../../utils/sql');

router.get('/classes', async (ctx) => {
  const {
    code,
    nickName,
    avatarUrl
  } = ctx.request.body
  const student_name = 'real_name'
  const { data: { openid } } = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  )
  const res = await query(`INSERT INTO student_list(student_name, nick_name, open_id, student_avatar) 
    VALUE('${student_name}','${nickName}','${openid}','${avatarUrl}') ON DUPLICATE KEY UPDATE student_name='${student_name}', nick_name='${nickName}', open_id='${openid}', student_avatar='${avatarUrl}'`)
  console.log(res)

  ctx.response.body = "返回带有用户id与班级id的token"
})

module.exports = router