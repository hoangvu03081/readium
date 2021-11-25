class Response {
  constructor(messages = [], errors = {}) {
    this.messages = messages;
    this.errors = errors;
  }
  reset() {
    this.messages = [];
    this.errors = {};
  }
}

module.exports = Response;
