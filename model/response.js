class BaseModel {
  constructor(data, message) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errcode = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errcode = -1;
  }
}
