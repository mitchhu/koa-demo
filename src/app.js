const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'Hello Koa'  
})

app.listen(5000, () => {
  console.log('server is running on http://localhost:5000')
})