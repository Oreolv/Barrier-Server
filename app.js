const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const requireDirectory = require('require-directory');
const koajwt = require('koa-jwt');
const { jwtSecret } = require('./config/secret');
const token = require('./middlewares/token');
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

app.use(token());

app.use(
  koajwt({
    secret: jwtSecret,
  }).unless({
    path: [/\/users\/login/, /\/covid\/all_data/],
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
requireDirectory(module, './routes', {
  visit: obj => {
    if (obj instanceof router) {
      app.use(obj.routes());
    }
  },
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
