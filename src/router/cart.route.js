const Router = require('koa-router')

const { auth } = require("../middleware/auth.middleware");
const { verifyParams } = require("../middleware/cart.middleware");
const { addToCart } = require("../controller/cart.controller");

const router = new Router({ prefix: '/carts' })

router.post('/', auth, verifyParams, addToCart);


// 4. 导出router对象
module.exports = router
