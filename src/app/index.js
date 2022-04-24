const Koa = require('koa')
const KoaBody = require('koa-body')

const errHandler = require('./errHandler')

const router = require('../router')

const app = new Koa()

app.use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods())

// 统一处理错误
app.on('error', errHandler)


module.exports = app