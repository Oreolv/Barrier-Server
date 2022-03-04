const { ErrorModel } = require('../model/response');

module.exports = function () {
  return async function (ctx, next) {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = new ErrorModel('登陆认证失败', null, 401);
      } else {
        throw err;
      }
    });
  };
};
