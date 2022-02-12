const Router = require('@koa/router');
const { register, login } = require('../controller/user');
const { userVerify } = require('../middleware/verify');
const { md5Crypto } = require('../middleware/md5-crypto');

const userRouter = new Router({
  prefix: '/user'
})


userRouter.post('/register', userVerify, md5Crypto, register)
userRouter.post('/login', login)


module.exports = userRouter;