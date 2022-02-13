const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = new Koa()
const router = new Router()

// 读入的是Buffer
const PRIVATE_KET = fs.readFileSync('./keys/private.key');
const PUBLIC_KEY = fs.readFileSync('./keys/public.key');

router.post('/test', (ctx, next) => {
  const payload = { name: "mx", age: 18 };
  
  const token = jwt.sign(payload, PRIVATE_KET, {
    expiresIn: 20,
    algorithm: "RS256"
  });
  ctx.response.body = token;
})

router.get('/demo', (ctx, next) => {
  const authorization = ctx.request.headers.authorization.split(" ")[1];
  
  try {
    const result = jwt.verify(authorization, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.response.body = result;
  } catch {
    ctx.response.body = '无效的token';
  }
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)