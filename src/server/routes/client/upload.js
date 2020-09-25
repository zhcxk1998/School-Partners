const router = require('koa-router')()
const qiniu = require('qiniu')
const {
  scope,
  accessKey,
  secretKey
} = require('../../config/qiniu_config')


router.post('/upload', async (ctx) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z2

  const options = {
    scope,
    // expires: 3600,
    saveKey: 'ImageMessages/$(etag)',
    mimeLimit: 'image/*',
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const key = 'aaa/123.png'
  const file = ctx.request.files.files.path

  formUploader.putFile(uploadToken, key, file, putExtra, (err, res, info) => {
    console.log(err)
    console.log(res)
    console.log(info)

    ctx.response.body = {

    }
  })


})

module.exports = router
