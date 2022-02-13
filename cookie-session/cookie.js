const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/test', (ctx, next) => {
  ctx.cookies.set("name", "mx", {
    maxAge: 1000 * 1000
  })
  ctx.body = "cookie设置成功"
})

router.get('/demo', (ctx, next) => {
  const value = ctx.cookies.get('name');
  ctx.body = 'cookie获取成功' + value;
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)