/**
 ** Authenticated users routes
 */

const router = require("express").Router();
const { checkAuthMiddleware } = require("../authUtils");

/**
 *! Route used in development for testing
 */

// ! check authenticated route
router.get("/protected", checkAuthMiddleware, (req, res) => {
  res.send({ message: ["User is authenticated"] });
});
/**
 *! Route used in development for testing
 */
module.exports = router;
