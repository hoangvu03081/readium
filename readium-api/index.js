const app = require("./app");
const port = process.env.PORT || 5000;

/**
 * ! test for gridfs
 */

// const fs = require("fs");
// const { MongoClient, GridFSBucket } = require("mongodb");
// const { getUrl } = require("./utils/db");
// const client = new MongoClient(getUrl());

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("sample_mv");

//     const bucket = new GridFSBucket(database);

//     fs.createReadStream("./tests/fixtures/homework.png").pipe(
//       bucket.openUploadStream("homework", {
//         chunkSizeBytes: 35520,
//       })
//     );

//     setTimeout(() => {
//       const cursor = bucket.find({});
//       cursor.forEach(async (doc) => console.log(doc));
//       // cursor.forEach((doc) => console.log("2", doc));
//     }, 1000);
//   } finally {
//     console.log("not close");
//   }
// }

// run().catch(console.dir);

/**
 * ! test for gridfs
 */

app.listen(port, () => {
  console.log("Express is listening on " + port);
});
