const router = require("express").Router();

router.get("/trending", async (req, res) => {
  try {
    return res.send([
      "#programming",
      "#technique",
      "#programming",
      "#programming",
      "#programming",
      "#programming",
      "#programming",
      "#programming",
    ]);
  } catch (err) {
    return res.send({ message: "Some errors occurred in get trending topics" });
  }
});

module.exports = router;
