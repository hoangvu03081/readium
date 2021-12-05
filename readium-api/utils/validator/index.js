module.exports = {
  checkEmpty: function (value, errMessage) {
    return !value ? errMessage : undefined;
  },
  validateEmail: function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      return "Your email is not valid";
    }
  },
  validatePassword: function (password) {
    const re = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]{6,}$/;
    if (!re.test(password)) {
      return "Your password must be greater than 6 characters";
    }
  },
  validateDisplayName: function (displayName) {
    const re = /^[a-zA-Z ]+$/g;
    if (!re.test(displayName)) {
      return "Your displayName must be a string";
    }
  },
  validateURL: function (url) {
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (!re.test(url)) {
      return "Your url is not valid";
    }
  },
};
