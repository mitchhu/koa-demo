const { cartFormatError } = require('../constant/error.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      cartFormatError.result = err
      return ctx.app.emit('error', cartFormatError, ctx)
    }

    await next()
  }
}

module.exports = {
  validator
}
