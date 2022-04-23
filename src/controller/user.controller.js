const { createUser, getUserInfo } = require('../service/user.service')

class userController {
  async register(ctx, next) {

    // 获取数据
    const { user_name, password } = ctx.request.body

    // 数据校验
    if(!user_name || !password) {
      ctx.status = 400,
      ctx.body = {
        code: '10001',
        message: '用户名或密码不能为空',
        result: ''
      }
      return
    }

    if(await getUserInfo({ user_name })) {
      ctx.status = 409,
      ctx.body = {
        code: '10002',
        message: '用户名已存在',
        result: ''
      }
      return
    }
    

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