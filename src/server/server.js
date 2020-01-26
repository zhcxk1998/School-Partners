const client = require('./app/client')
const admin = require('./app/admin')

client.listen(3000, () => {
  console.log('小程序端已启动: 端口号为3000')
})

admin.listen(4000, () => {
  console.log('管理端已启动: 端口号为4000')
})