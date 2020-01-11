const crypto = require('crypto')

const getRandomSalt = () => {
  const start = Math.floor(Math.random() * 5)
  const count = start + Math.ceil(Math.random() * 5)
  return crypto.randomBytes(10).toString('hex').slice(start, count)
}

const getEncrypt = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

module.exports = {
  getRandomSalt,
  getEncrypt
}