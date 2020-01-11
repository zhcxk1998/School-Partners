const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE, INSERT_TABLE, UPDATE_TABLE, DELETE_TABLE } = require('../../utils/sql');
const parse = require('../../utils/parse')
const formatTime = require('../../utils/formatTime')

router.get('/contacts', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('contacts_list'));
  await Promise.all(res.map(async (item, index) => {
    const { title, avatar, latest_message, contacts_id } = item
    const chatlog = await query(`SELECT * FROM chatlog WHERE room_name = '${contacts_id}' ORDER BY current_time DESC`);
    const latestMessage = chatlog[chatlog.length - 1]
    const { user_name, message, current_time } = latestMessage
    response[index] = {
      title,
      avatar,
      contactsId: contacts_id,
      latestMessage: {
        userName: user_name,
        message,
        currentTime: formatTime(current_time)
      }
    }
  }))
  ctx.response.body = parse(response)
})

module.exports = router