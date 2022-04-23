const { createUser } = require('../service/user.service')

class userController {
  async register(ctx, next) {

    // 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    // 数据库操作
    const res = await createUser(user_name, password)

    console.log(res)

    // 返回结果
    ctx.body = '用户注册成功'

  }
  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new userController()