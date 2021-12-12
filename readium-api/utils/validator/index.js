function checkEmpty(value, errMessage) {
  return !value ? errMessage : undefined;
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return "Your email is not valid";
  }
}
function validatePassword(password) {
  const re = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]{6,}$/;
  if (!re.test(password)) {
    return "Your password must be greater than 6 characters";
  }
}
function validateDisplayName(displayName) {
  const re = /^[a-zA-Z 0-9]+$/g;
  if (!re.test(displayName)) {
    return "Your displayName must be a string or a number from 0 to 9";
  }
}
function validateURL(url) {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  if (!re.test(url)) {
    return "Your url is not valid";
  }
}
function validateRePattern(value, re, message) {
  if (!re.test(value)) return message;
}
function validateFacebookLink(url) {
  const re = /(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:facebook\.com|fb(?:\.me|\.com))\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/|pg\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*/;
  return validateRePattern(url, re, "Your Facebook link is not valid");
}
function validateTwitterLink(url) {
  const re = /(https?:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/;
  return validateRePattern(url, re, "Your Twitter link is not valid");
}
function validateInstaLink(url) {
  const re = /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+).*/;
  return validateRePattern(url, re, "Your Instagram link is not valid");
}

module.exports = {
  checkEmpty,
  validateEmail,
  validatePassword,
  validateDisplayName,
  validateURL,
  validateRePattern,
  validateFacebookLink,
  validateTwitterLink,
  validateInstaLink,
};
