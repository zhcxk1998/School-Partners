const crypto = require('crypto')

const getRandomSalt = () => {
  const start = Math.floor(Math.random() * 5)
  const count = start + Math.ceil(Math.random() * 5)
  return crypto.randomBytes(10).toString('hex').slice(start, count)
}

module.exports = {
  getRandomSalt
}