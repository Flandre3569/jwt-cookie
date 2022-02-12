const Router = require('@koa/router');
const { register } = require('../controller/user');
const { userVerify } = require('../middleware/verify');
const { md5Crypto } = require('../middleware/md5-crypto');

const registerRouter = new Router({
  prefix: '/register'
})

registerRouter.post('/user', userVerify, md5Crypto, register)


module.exports = registerRouter;