const axios = require('axios');
const { exec } = require('../db/mysql');
const { weappSecret, jwtSecret } = require('../config/secret');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');

const getOpenID = async code => {
  const { data } = await axios({
    method: 'post',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      appid: weappSecret.appid,
      secret: weappSecret.secret,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });
  return data.openid;
};

const login = async code => {
  const openid = await getOpenID(code);
  if (openid) {
    const sql = `select * from users where openid='${openid}'`;
    const data = await exec(sql);
    if (data.length == 0) {
      // 新用户自动注册
      const newUser = `INSERT INTO users (openid) VALUES ('${openid}')`;
      await exec(newUser);
    }
    const result = jsonwebtoken.sign(
      {
        // token中暂时只写入openid
        openid: data[0].openid,
      },
      jwtSecret,
      { expiresIn: '30d' } // zeit/ms规范
    );
    return new SuccessModel('登陆成功', result);
  }
  return new ErrorModel('登陆失败');
};

module.exports = { login };
