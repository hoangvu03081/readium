class Response {
  constructor(messages = [], errors = {}) {
    this.messages = messages;
    this.errors = errors;
  }
  get response() {
    return {
      body: { messages: this.messages },
      errors: this.errors,
    };
  }
}

module.exports = Response;
