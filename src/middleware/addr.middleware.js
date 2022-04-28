const { addrFormatError } = require("../constant/error.type");


const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      addrFormatError.result = err
      return ctx.app.emit('error', addrFormatError, ctx)
    }

    await next()
  }
}

module.exports = {
  validator
}