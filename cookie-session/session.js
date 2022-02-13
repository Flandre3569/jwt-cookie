const Koa = require('koa')
const Router = require('koa-router')
const Session = require('koa-session')


const app = new Koa()
const router = new Router()

const session = Session({
  key: 'sessionid',
  maxAge: 10 * 1000,
  signed: true
}, app)
app.keys = ['aaa']
app.use(session)

router.get('/test', (ctx, next) => {
  const id = 1;
  const name = 'mx';
  ctx.session.user = { id, name };
  ctx.response.body = 'test';
})

router.get('/demo', (ctx, next) => {
  console.log(ctx.session.user);
  ctx.response.body = 'demo'
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)