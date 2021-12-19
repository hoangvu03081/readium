const multer = require("multer");

const configMulter = (...props) =>
  multer({
    ...props,
    fileFilter(req, file, cb) {
      const mimeRe = /^image\/(jpg|jpeg|png|webp|avif|tiff|gif|svg\+xml)$/i;
      const nameRe = /\.(jpg|jpeg|png|webp|avif|tiff|gif|svg)$/i;
      if (mimeRe.test(file.mimetype) && nameRe.test(file.originalname)) {
        return cb(null, true);
      }
      return cb(new Error("Your type of file is not acceptable"));
    },
  });

module.exports = configMulter;
