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

const checkValidSkipAndDate = async (req, res, next) => {
  let { date = new Date().toString(), skip = "0" } = req.query;
  skip = +skip;
  date = new Date(date);

  if (Number.isNaN(skip)) {
    return res.status(400).send({ message: "skip parameter must be a number" });
  }

  if (date.toString() === "Invalid Date") {
    return res.status(400).send({ message: "Invalid date parameter" });
  }

  req.date = date;
  req.skip = skip;
  return next();
};

const checkOwnPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.author !== req.user._id) {
    return res.status(400).send({
      message: "You do not own this post to update its content",
    });
  }

  req.post = post;
  return next();
};

const getImageUrl = (postId) => `${serverUrl}/posts/${postId}/cover-image`;
const getAvatarUrl = (userId) => `${serverUrl}/users/profiles/avatar/${userId}`;

module.exports = {
  downloadImageFromUrl,
  convertBufferToPng,
  checkValidSkipAndDate,
  checkOwnPost,
  getImageUrl,
  getAvatarUrl,
};
