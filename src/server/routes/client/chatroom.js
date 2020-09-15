const router = require('koa-router')()
const {
  query
} = require('../../utils/query')
const {
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} = require('../../utils/sql');
const parse = require('../../utils/parse')
const formatTime = require('../../utils/formatTime')

router.get('/chatlog', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('chatlog'));
  res.map((item, index) => {
    const {
      room_name,
      user_name,
      user_avatar,
      current_time,
      message,
      openid = ''
    } = item
    response[index] = {
      to: room_name,
      userName: user_name,
      userAvatar: user_avatar,
      currentTime: current_time,
      message,
      openid
    }
  })
  ctx.response.body = parse(response)
})

router.get('/chatlog/:to', async (ctx) => {
  const to = ctx.params.to
  const response = []
  const res = await query(`SELECT * FROM chatlog WHERE room_name = '${to}' ORDER BY current_time DESC`);
  res.map((item, index) => {
    const {
      room_name,
      user_name,
      user_avatar,
      current_time,
      message,
      openid = ''
    } = item
    response[index] = {
      to: room_name,
      userName: user_name,
      userAvatar: user_avatar,
      currentTime: formatTime(current_time),
      message,
      messageId: `msg${current_time}${Math.ceil(Math.random() * 100)}`,
      openid
    }
  })
  ctx.response.body = parse(response)
})

module.exports = router
