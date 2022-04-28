const { createAddr } = require('../service/addr.service');


class AddrController {

  async create(ctx, next) {
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;
    try {
      const res = await createAddr({ user_id, consignee, phone, address })
      if(res) {
        ctx.body = {
          code: 0,
          message: '添加地址成功',
          result: ''
        }
      }
    } catch (err) {
      ctx.app.emit('error', {}, ctx)
    }
  }
}

module.exports = new AddrController();