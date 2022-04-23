const Router = require('koa-router')

const { register } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', register)

module.exports = router
