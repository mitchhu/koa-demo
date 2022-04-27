const Router = require('koa-router')

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
const { addToCart, findAll, update } = require("../controller/cart.controller");

const router = new Router({ prefix: '/carts' })

// 添加购物车
router.post('/', auth, validator({ goods_id: 'number' }), addToCart);

// 获取购物车列表
router.get('/', auth, findAll);

// 更新购物车
router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
);


// 4. 导出router对象
module.exports = router
