const secret = "zhcxk1998"

const jwt = require('jsonwebtoken')

/* 生成用户身份凭证token */
const generateToken = (payload = {}) => (
  'Bearer ' + jwt.sign(payload, secret, { expiresIn: '7d' })
)

/* 解密token获取信息 */
const getJWTPayload = (token) => (
  jwt.verify(token.split(' ')[1], secret)
)

module.exports = {
  generateToken,
  getJWTPayload
}