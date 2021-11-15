const axios = require("axios").default;
const EventEmitter = require("events").EventEmitter;

// create an event emitter
const bufferEmitter = new EventEmitter();

// * Ex:
//  + on downloaded event event,
//  + we receive a buffer of the image
//    bufferEmitter.on("downloaded", (buf) => {
//      console.log(buf);
//    });

// This is a stream so use then, catch
function getImageBufferFromUrl(url) {
  axios.get(url, { responseType: "stream" }).then((res) => {
    // create an array of buffer
    const bufs = [];

    res.data.on("data", (data) => {
      bufs.push(data);
    });

    // join the array of buffer into one buffer object
    res.data.on("end", () => {
      const buf = Buffer.concat(bufs);
      // emit 'downloaded' event to return buf
      bufferEmitter.emit("downloaded", buf);
    });
  });
}

module.exports = {
  bufferEmitter,
  getImageBufferFromUrl,
};
