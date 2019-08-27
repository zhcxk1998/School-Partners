const router = require('koa-router')()
const { query } = require('../utils/query')
const { QUERY_TABLE, INSERT_TABLE, UPDATE_TABLE, DELETE_TABLE } = require('../utils/sql');
const parse = require('../utils/parse')

router.get('/contacts', async (ctx) => {
  const response = []
  const res = await query(QUERY_TABLE('contacts_list'));
  res.map((item, index) => {
    const { title, avatar, latest_message, contacts_id } = item
    response[index] = {
      title,
      avatar,
      contactsId: contacts_id
    }
  })
  ctx.response.body = parse(response)
})

module.exports = router