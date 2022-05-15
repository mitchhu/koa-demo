const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpiredError,
  invalidToken,
  hasNotAdminPremission
} = require('../constant/error.type')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer', '').trim()
  try {
    // user中包含了payload的信息（id, user_name, is_admin）
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.log('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.log('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
      default:
        break
    }
  }

  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    return ctx.app.emit('error', hasNotAdminPremission, ctx)
  }

  await next()
}

module.exports = {
  auth,
  hadAdminPermission
}
