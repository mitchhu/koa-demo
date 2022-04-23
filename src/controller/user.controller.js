const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')

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
        code: '10000',
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
    ctx.body = '用户登录成功'
  }
}

module.exports = new userController()