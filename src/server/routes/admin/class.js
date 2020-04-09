const router = require('koa-router')()
const { query } = require('../../utils/query')
const { UPDATE_TABLE_MULTI } = require('../../utils/sql');
const { getJWTPayload } = require('../../utils/token')

router.get('/classes', async (ctx) => {
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const { header: { authorization } } = ctx
    const { userId } = getJWTPayload(authorization)
    const userInfo = (await query(`SELECT class_id FROM user_info WHERE id = ${userId}`))[0];
    const { class_id: classId } = userInfo
    const { id, class_code, class_name, class_teacher, class_member, class_tag, is_checked, class_avatar } = (await query(`SELECT * FROM class_list WHERE id = ${classId}`))[0]
    responseBody.data = {
      classInfo: {
        id,
        classCode: class_code,
        className: class_name,
        classTeacher: class_teacher,
        classMember: class_member,
        classTag: class_tag,
        classAvatar: class_avatar,
        isChecked: !!is_checked
      }
    }
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '无班级信息'
    responseBody.code = 500
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

router.put('/classes', async (ctx) => {
  const responseBody = {
    code: 0,
    data: {}
  }
  try {
    const { header: { authorization }, request: { body } } = ctx
    const { className, classTeacher, classTag, classCode, classAvatar, isChecked } = body
    const { userId } = getJWTPayload(authorization)
    const userInfo = (await query(`SELECT class_id FROM user_info WHERE id = ${userId}`))[0];
    const { class_id: classId } = userInfo
    await query(UPDATE_TABLE_MULTI('class_list', { primaryKey: 'id', primaryValue: classId }, {
      id: classId,
      class_name: className,
      class_teacher: classTeacher,
      class_code: classCode,
      class_tag: classTag,
      class_avatar: classAvatar,
      is_checked: isChecked ? 1 : 0
    }))
    await query(UPDATE_TABLE_MULTI('user_info', { primaryKey: 'id', primaryValue: userId }, {
      is_actived: 1
    }))
    responseBody.data.msg = '修改成功'
    responseBody.code = 200
  } catch (e) {
    responseBody.data.msg = '异常错误'
    responseBody.code = 500
  } finally {
    ctx.response.status = responseBody.code
    ctx.response.body = responseBody
  }
})

module.exports = router