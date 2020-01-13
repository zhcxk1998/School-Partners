const interceptToken = async (ctx, next) => {
  return await next().catch((err) => {
    const { status } = err
    if (status === 401) {
      ctx.response.status = 401
      ctx.response.body = {
        code: 401,
        data: {
          msg: '请登录后重试'
        }
      }
    } else {
      throw err
    }
  })
}

module.exports = () => (
  interceptToken
)