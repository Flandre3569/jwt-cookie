const service = require('../service/user');
const errorTypes = require('../errors/error-types');
const md5PWD = require('../utils/pwd-handle');

class UserController {
  async register(ctx, next) {
    // 取数据
    const user = ctx.request.body;
    // 传入service中对数据库进行操作
    const result = await service.register(user);
    // 返回数据
    ctx.response.body = result;
  }

  async login(ctx, next) {
    const user = ctx.request.body;
    const password = md5PWD(user.password);
    
    if (!user.username || !user.password) {
      const error = new Error(errorTypes.NO_USER_OR_PASSWORD)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await service.queryByName(user);
    if (result.length && result[0].password === password) {
      ctx.response.body = '登录成功';
    } else {
      const error = new Error(errorTypes.USERNAME_OR_PASSWORD_ERROR);
      return ctx.app.emit('error', error, ctx);
    }
  }
}

module.exports = new UserController();