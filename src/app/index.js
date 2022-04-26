const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

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
  .use(parameter(app))
  .use(router.routes())
  .use(router.allowedMethods())

// 统一处理错误
app.on('error', errHandler)


module.exports = app