class Validator {
  constructor() {
    this.errors = {
      email: [],
      password: [],
      displayName: [],
    };
  }

  resetErrors() {
    this.errors = {
      email: [],
      password: [],
      displayName: [],
    };
  }

  checkEmpty(field, value) {
    // field: email, password, displayName.
    let isValid = true;
    if (!value) {
      this.errors[field].push(`${field} must not be empty!`);
      isValid = false;
    }
    return isValid;
  }

  validateEmail(email) {
    let isValid = this.checkEmpty("email", email);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      isValid = false;
      this.errors.email.push("Your email is not valid");
    }

    return isValid;
  }

  validatePassword(password) {
    let isValid = this.checkEmpty("password", password);

    const re = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]{6,}$/;

    if (!re.test(password)) {
      isValid = false;
      this.errors.password.push(
        "Your password must be greater than 6 characters"
      );
    }

    return isValid;
  }

  validateDisplayName(displayName) {
    let isValid = this.checkEmpty("displayName", displayName);

    const re = /^[a-zA-Z ]+$/g;

    if (!re.test(displayName)) {
      isValid = false;
      this.errors.displayName.push("Your displayName must be a string");
    }

    return isValid;
  }
}

const validator = new Validator();

module.exports = validator;
