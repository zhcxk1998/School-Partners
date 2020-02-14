const crypto = require('crypto')

const generateRandomCode = () => {
  return crypto.randomBytes(10).toString('hex').slice(0, 6)
}

module.exports = {
  generateRandomCode
}