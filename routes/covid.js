const router = require('koa-router')();
const { getChinaData } = require('../controller/covid');
router.prefix('/api/covid');

router.get('/china', async function (ctx, next) {
  const result = await getChinaData();
  ctx.body = result;
});

module.exports = router;
