const axios = require("axios").default;
const sharp = require("sharp");

const { once, EventEmitter } = require("events");
const bufferEmitter = new EventEmitter();

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

module.exports = {
  downloadImageFromUrl,
  convertBufferToPng,
};
