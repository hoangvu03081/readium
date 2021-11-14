class Validator {
  constructor() {
    this.errors = {
      email: [],
      password: [],
      fullname: [],
    };
  }

  resetErrors() {
    this.errors = {
      email: [],
      password: [],
      fullname: [],
    };
  }

  checkEmpty(field, value) {
    // field: email, password, fullname.
    let isValid = true;
    if (!value) {
      this.errors[field].push(`${field} must not be empty!`);
      isValid = false;
    }
    return isValid;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(email);

    if (!isValid) {
      this.errors.email.push("Your email is not valid");
    }

    return isValid;
  }

  validatePassword(password) {
    const re = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]{6,}$/;
    const isValid = re.test(password);

    if (!isValid) {
      this.errors.password.push("Your password must be greater than 6 characters");
    }

    return isValid;
  }

  validateFullname(fullname) {
    const re = /^[a-zA-Z]$/g;
    const isValid = re.test(fullname);

    console.log(isValid);

    if (!isValid) {
      this.errors.fullname.push(
        "Your fullname must be a string"
      );
    }

    return isValid;
  }
}

module.exports = Validator;
