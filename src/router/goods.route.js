const Router = require('koa-router')

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const {
  upload,
} = require("../controller/goods.controller");

const router = new Router({ prefix: '/goods' })

// 上传
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload', upload)

module.exports = router
