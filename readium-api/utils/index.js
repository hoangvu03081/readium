const {
  checkEmpty,
  validateEmail,
  validatePassword,
  validateDisplayName,
  validateURL,
  validateRePattern,
  validateFacebookLink,
  validateTwitterLink,
  validateInstaLink,
} = require("./validator");

const { sendWelcomeEmail, sendResetPasswordEmail } = require("./sendMail");

const { pushTask } = require("./rabbitmq");

const { getUrl } = require("./mongo");

const {
  PUB_KEY,
  authMiddleware,
  issueJWT,
  decodeJWT,
  jwtOptions,
  encrypt,
  decrypt,
  NO_AUTH_TOKEN,
  REQUIRE_ACTIVATE_ACCOUNT,
} = require("./auth");

const axios = require("axios").default;
const sharp = require("sharp");

const { once, EventEmitter } = require("events");
const bufferEmitter = new EventEmitter();

const { serverUrl } = require("../config/url");

function getImageBufferFromUrl(url) {
  axios.get(url, { responseType: "stream" }).then((res) => {
    const bufs = [];

    res.data.on("data", (data) => {
      bufs.push(data);
    });

    res.data.on("end", () => {
      const buf = Buffer.concat(bufs);
      bufferEmitter.emit("downloaded", buf);
    });
  });
}

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function downloadImageFromUrl(url) {
  getImageBufferFromUrl(url);
  return once(bufferEmitter, "downloaded");
}

function convertBufferToPng(buffer) {
  return sharp(buffer).png().toBuffer();
}

function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

const getPostCoverImageUrl = (postId) =>
  `${serverUrl}/posts/${postId}/cover-image`;
const getDraftCoverImageUrl = (postId) =>
  `${serverUrl}/drafts/${postId}/cover-image`;
const getAvatarUrl = (userId) => `${serverUrl}/users/profiles/avatar/${userId}`;
const getUserCoverImageUrl = (userId) =>
  `${serverUrl}/users/profiles/cover-image/${userId}`;

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
  sendWelcomeEmail,
  sendResetPasswordEmail,
  pushTask,
  PUB_KEY,
  authMiddleware,
  issueJWT,
  decodeJWT,
  jwtOptions,
  encrypt,
  decrypt,
  NO_AUTH_TOKEN,
  REQUIRE_ACTIVATE_ACCOUNT,
  streamToString,
  downloadImageFromUrl,
  convertBufferToPng,
  removeAccents,
  getPostCoverImageUrl,
  getDraftCoverImageUrl,
  getAvatarUrl,
  getUserCoverImageUrl,
  getUrl,
};
