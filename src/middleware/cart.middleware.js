const {
  invalidGoodsID,
} = require("../constant/error.type");


const verifyParams = async (ctx, next) => {
  
  try {
    ctx.verifyParams({
      goods_id: 'number',
    })
  } catch (err) {
    return ctx.app.emit('error', invalidGoodsID, ctx)
  }

  await next()
}

module.exports = {
  verifyParams
}