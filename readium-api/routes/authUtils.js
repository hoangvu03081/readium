const checkAuthMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(400).send({ message: ["User is not authenticated"] });
};

module.exports = { checkAuthMiddleware };
