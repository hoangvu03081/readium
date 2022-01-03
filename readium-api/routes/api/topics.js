const router = require("express").Router();
const { getTrendingTopics } = require("../../utils/elasticsearch");

router.get("/trending", async (req, res) => {
  /*
    #swagger.tags = ['Topic']
    #swagger.summary = 'Get all trending topics'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let count = 0;
    let tags, result;
    do {
      result = await getTrendingTopics();
      tags = result.body.aggregations.time_range.buckets[0].popular_tags.buckets.map(
        (tag) => tag.key
      );
      count += 5;
    } while (tags.length < 5 && count < 100);

    return res.send(tags);
  } catch (err) {
    console.log(err);
    return res.send({ message: "Some errors occurred in get trending topics" });
  }
});

module.exports = router;
