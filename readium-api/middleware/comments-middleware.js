const checkCommentContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({
      message:
        "Please provide comment content before request to this endpoint!",
    });
  }

  return next();
};
module.exports = { checkCommentContent };
