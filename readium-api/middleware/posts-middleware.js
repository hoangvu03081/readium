const Post = require("../models/Post");

const checkOwnPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(400).send({
      message: "You do not own this post to update its content",
    });
  }

  req.post = post;
  return next();
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

module.exports = { checkOwnPost,checkValidSkipAndDate };
