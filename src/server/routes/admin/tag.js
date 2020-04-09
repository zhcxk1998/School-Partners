const router = require('koa-router')()
const { query } = require('../../utils/query')
const { QUERY_TABLE } = require('../../utils/sql');

router.get('/tags', async (ctx) => {
  const responseData = []
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const res = await query(QUERY_TABLE('tag_list'));
    res.map((item, index) => {
      const { id,tag_name } = item
      responseData[index] = {
        id,
        tagName: tag_name
      }
    })
    responseBody.code = 200
    responseBody.data = {
      tagList: responseData,
      total: responseData.length
    }
  } catch (e) {
    responseBody.code = 404
    responseBody.data = {
      msg: '无标签信息'
    }
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router