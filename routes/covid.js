const router = require('koa-router')();
const { getChinaData, getProvinceData } = require('../controller/covid');
router.prefix('/api/covid');

router.get('/china', async function (ctx, next) {
  const result = await getChinaData();
  ctx.body = result;
});

router.get('/province', async function (ctx, next) {
  const result = await getProvinceData();
  ctx.body = result;
});

module.exports = router;
