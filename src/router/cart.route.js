const Router = require('koa-router')

const { auth } = require("../middleware/auth.middleware");
const { verifyParams } = require("../middleware/cart.middleware");
const { addToCart, findAll } = require("../controller/cart.controller");

const router = new Router({ prefix: '/carts' })

// 添加购物车
router.post('/', auth, verifyParams, addToCart);

// 获取购物车列表
router.get('/', auth, findAll);


// 4. 导出router对象
module.exports = router
