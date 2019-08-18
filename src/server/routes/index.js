const router = require('koa-router')()
const course = require('./course')
const exam = require('./exam')

router.use('', course.routes(), course.allowedMethods())
router.use('', exam.routes(), exam.allowedMethods())

module.exports = router
