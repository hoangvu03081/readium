/**
 ** Authenticated users routes
 */

const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");

/**
 *! Route used in development for testing
 */

// ! check authenticated route
router.get("/protected", authMiddleware, (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Route for testing authenticated users'
  /* #swagger.security = [{
        "bearerAuth": []
  }] */

  res.send({ message: ["User is authenticated"] });
});
/**
 *! Route used in development for testing
 */
module.exports = router;
