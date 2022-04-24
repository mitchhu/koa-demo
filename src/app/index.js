const path = require('path')
const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaBody = require('koa-body')

const errHandler = require('./errHandler')
const router = require('../router')

const app = new Koa()

app.use(KoaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}))
  .use(KoaStatic(path.join(__dirname, '../upload')))
  .use(router.routes())
  .use(router.allowedMethods())

// 统一处理错误
app.on('error', errHandler)


module.exports = app