const secret = "zhcxk1998"

const jwt = require('jsonwebtoken')

const generateToken = (payload = {}) => (
  'Bearer ' + jwt.sign(payload, secret, { expiresIn: '7d' })
)

const getJWTPayload = (token) => (
  jwt.verify(token.split(' ')[1], secret)
)

module.exports = {
  generateToken,
  getJWTPayload
}