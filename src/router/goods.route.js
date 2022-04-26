const Router = require('koa-router')

const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const { upload, create, update, remove } = require("../controller/goods.controller");

const router = new Router({ prefix: '/goods' })

// 上传
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload', upload)

// 发布商品
router.post('/', auth, hadAdminPermission, validator, create)
// 修改商品
router.put('/:id', auth, hadAdminPermission, validator, update)
// 删除商品
router.delete('/:id', auth, hadAdminPermission, remove)

module.exports = router
