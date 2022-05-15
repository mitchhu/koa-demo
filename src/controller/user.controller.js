const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')

const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register (ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body

    try {
      // 数据库操作
      const res = await createUser(user_name, password)

      // 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login (ctx, next) {
    const { user_name } = ctx.request.body

    // 获取用户信息（在token的payload中，记录id，user_name, is_admin）
    try {
      // 剔除passwor属性，将剩余的属性放在res对象中
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (err) {
      console.log('用户登录失败', err)
    }
  }

  async changePassword (ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body

    try {
      const res = await updateById({ id, password })
      if (res) {
        ctx.body = {
          code: 0,
          message: '密码修改成功',
          result: ''
        }
      }
    } catch (err) {
      // ctx.app.emit('error', {}, ctx)
    }
  }
}

module.exports = new UserController()
