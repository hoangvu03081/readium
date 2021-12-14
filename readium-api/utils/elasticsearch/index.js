const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://elasticsearch:9200",
  requestTimeout: 120000,
  maxRetries: 3,
});

client.cluster.health({}, (error, result) => {
  // if (error) {
  //   console.error(error);
  // }
  // console.log(result.body);
});
