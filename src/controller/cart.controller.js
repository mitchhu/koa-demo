const { createOrUpdate, findAllCarts } = require('../service/cart.service');


class CartController {

  async addToCart(ctx, next) {
    const user_id = ctx.state.user.id;
    const { goods_id } = ctx.request.body;
    
    try {
      const res = await createOrUpdate(user_id, goods_id)
      if(res) {
        ctx.body = {
          code: 0,
          message: '添加到购物车成功',
          result: ''
        }
      }
    } catch (err) {
      ctx.app.emit('error', {}, ctx)
    }
  }


  async findAll(ctx, next) {
    try {
      const { pageNum = 1, pageSize = 10 } = ctx.request.query;
      const res = await findAllCarts(pageNum, pageSize);
      console.log('res', res)
      ctx.body = {
        code: 0,
        message: "获取购物车列表成功",
        result: res,
      };
    } catch (err) {
      return ctx.app.emit("error", {}, ctx);
    }
  }

}

module.exports = new CartController();