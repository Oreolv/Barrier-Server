let MYSQL_CONF;

if (process.env.NODE_ENV == 'production') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    port: '3306',
    database: 'barrier',
    user: 'barrier',
    password: 'F5ewL6LRJRZZ6Hsz',
  };
} else {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    database: 'barrier',
    user: 'root',
    password: '123456',
  };
}

module.exports = {
  MYSQL_CONF,
};
