const fs = require('fs');
const path = require('path');
const { SuccessModel, ErrorModel } = require('../model/response');

const getChinaData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../static/china_data.json'), function (err, data) {
      if (err) {
        reject(new ErrorModel('获取失败'));
      }
      const json = JSON.parse(data.toString());
      resolve(new SuccessModel('获取成功', json));
    });
  });
};

const getProvinceData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../static/province_data.json'), function (err, data) {
      if (err) {
        reject(new ErrorModel('获取失败'));
      }
      const json = JSON.parse(data.toString());
      resolve(new SuccessModel('获取成功', json));
    });
  });
};

module.exports = { getChinaData, getProvinceData };