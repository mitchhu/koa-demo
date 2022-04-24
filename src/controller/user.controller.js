const jwt = require('jsonwebtoken')
const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')

const { JWT_SECRET } = require('../config/config.default')

class userController {
  
  async register(ctx, next) {

    // 获取数据
    const { user_name, password } = ctx.request.body

    try {

      // 数据库操作
      const res = await createUser(user_name, password)

      console.log('createUser: ', res)

      // 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          user_name: res.user_name
        }
      }
    } catch (error) {
      // console.log('createUser catch: ', error)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    // 获取用户信息（在token的payload中，记录id，user_name, is_admin）
    try {
      // 剔除passwor属性，将剩余的属性放在res对象中
      const {password, ...res} = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
        }
      }
    } catch (error) {
      console.log('用户登录失败', error)
      return
    }
  }
}

module.exports = new userController()