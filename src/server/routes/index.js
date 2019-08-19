const router = require('koa-router')()
const course = require('./course')
const exercise = require('./exercise')

router.use('', course.routes(), course.allowedMethods())
router.use('', exercise.routes(), exercise.allowedMethods())

module.exports = router
