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

const downloadImageFromUrl = (url) => {
  getImageBufferFromUrl(url);
  return once(bufferEmitter, "downloaded");
};

const convertBufferToPng = (buffer) => {
  return sharp(buffer).png().toBuffer();
};

const getImageUrl = (postId) => `${serverUrl}/posts/${postId}/cover-image`;

module.exports = {
  downloadImageFromUrl,
  convertBufferToPng,
  getImageUrl,
};
