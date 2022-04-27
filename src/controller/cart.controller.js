const { cartFormatError } = require('../constant/error.type');
const { createOrUpdate, findAllCarts, updateCarts, removeCarts, selectAllCarts, unselectAllCarts } = require('../service/cart.service');


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


  async update(ctx, next) {
    try {
      const { id } = ctx.request.params;
      const { number, selected } = ctx.request.body;
      if(number === undefined && selected === undefined) {
        return ctx.app.emit("error", cartFormatError, ctx);
      }
      const res = await updateCarts({ id, number, selected });
      if(res) {
        ctx.body = {
          code: 0,
          message: "更新购物车成功",
          result: '',
        };
      } else {
        return ctx.app.emit("error", {}, ctx);
      }
    } catch (err) {
      return ctx.app.emit("error", {}, ctx);
    }
  }

  async remove(ctx, next) {

    const { ids } = ctx.request.body;

    const res = await removeCarts(ids);
    if(res) {
      ctx.body = {
        code: 0,
        message: "删除购物车成功",
        result: '',
      };
    } else {
      ctx.app.emit('error', {message: '商品不存在',}, ctx)
    }
  }

  async selectAll(ctx, next) {
    const user_id = ctx.state.user.id;
    const res = await selectAllCarts(user_id);
    ctx.body = {
      code: 0,
      message: "全选成功",
      result: '',
    };
  }

  async unselectAll(ctx, next) {
    const user_id = ctx.state.user.id;
    const res = await unselectAllCarts(user_id);
    ctx.body = {
      code: 0,
      message: "取消全选成功",
      result: '',
    };
  }
  

}

module.exports = new CartController();