const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/error.type");

const userValidator = async (ctx, next) => {
  // 获取数据
  const { user_name, password } = ctx.request.body;

  // 数据校验
  if (!user_name || !password) {
    console.error("用户名或密码为空:", ctx.request.body);
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }

  await next();
};

const verifyUser = async (ctx, next) => {
  // 获取数据
  const { user_name } = ctx.request.body;

  // 数据校验
  try {
    const res = await getUserInfo({ user_name })
    if(res) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return
    }
  } catch (error) {
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next();
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  // 判断用户是否存在
  try {
    const res = await getUserInfo({ user_name })
    if(res) {
      ctx.app.emit("error", userDoesNotExist, ctx);
      return
    }
  } catch (error) {
    ctx.app.emit('error', userLoginError, ctx)
    return
  }

  // 密码是否匹配
  if(bcrypt.compareSync(password, password)) {
    ctx.app.emit('error', invalidPassword, ctx)
    return
  }

  await next();
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
