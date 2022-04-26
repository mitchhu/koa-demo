const Router = require('koa-router')

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const { upload, create } = require("../controller/goods.controller");

const router = new Router({ prefix: '/goods' })

// 上传
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload', upload)

// 发布商品
router.post('/', auth, hadAdminPermission, validator, create)

module.exports = router
