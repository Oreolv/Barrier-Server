class BaseModel {
  constructor(message, data) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(message, data) {
    super(message, data);
    this.errcode = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(message, data) {
    super(message, data);
    this.errcode = -1;
  }
}

module.exports = { SuccessModel, ErrorModel };
