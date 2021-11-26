export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "") return "";
  if (!re.test(String(email).toLowerCase())) return "Wrong email format";
  return "";
}

export function validatePassword(password) {
  if (password.length < 6 && password.length !== 0)
    return "Minimum length is 6";
  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (
    confirmPassword.length === 0 ||
    (confirmPassword.length === 0 && password.length === 0)
  )
    return "";
  return password !== confirmPassword ? "Does not match" : "";
}
