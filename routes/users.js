const router = require('koa-router')();
const { login } = require('../controller/users');
router.prefix('/api/users');

router.post('/login', async function (ctx, next) {
  const code = ctx.request.body.code;
  const result = await login(code);
  ctx.body = result;
});

module.exports = router;
