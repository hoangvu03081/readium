const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { getImageUrl } = require("../../utils");
const { authMiddleware } = require("../../utils/auth");

/**
 *! Dev routes
 */

// ! check authenticated route
router.get("/protected", authMiddleware, (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Route for testing authenticated users'
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

  return res.send({ message: "User is authenticated" });
});
/**
 *! Dev routes
 */

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user._id);
    return res.send({ message: "Sorry to see you go.", user: userDeleted });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when delete account" });
  }
});

// didn't test
router.get("/following/posts", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.summary = "Get following writers' posts"
    #swagger.parameters['skip'] = {
      in: 'query',
      type: 'integer',
    }
    #swagger.parameters['date'] = {
      in: 'query',
      type: 'string',
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  let { date = new Date().toString(), skip = "0" } = req.query;
  skip = +skip;
  date = new Date(date);

  if (Number.isNaN(skip)) {
    return res.status(400).send({ message: "skip parameter must be a number" });
  }

  try {
    if (date.toString() === "Invalid Date") {
      let posts = JSON.parse(
        JSON.stringify(
          await Post.find(
            {
              isPublished: true,
              author: { $in: req.user.followings },
            },
            { coverImage: 0 }
          )
            .skip(skip)
            .sort({ publishDate: -1 })
            .limit(5)
        )
      );
      posts = posts.map((post) => {
        post.imageUrl = getImageUrl(post._id);
        return post;
      });
      return res.send({ posts });
    }

    let posts = JSON.parse(
      JSON.stringify(
        await Post.find(
          {
            isPublished: true,
            publishDate: { $lte: date },
            author: { $in: req.user.followings },
          },
          { coverImage: 0 }
        )
          .skip(skip)
          .sort({ publishDate: -1 })
          .limit(5)
      )
    );
    posts = posts.map((post) => {
      post.imageUrl = getImageUrl(post._id);
      return post;
    });

    if (posts.length === 0) return res.send({ posts });
    return res.send({ posts, next: skip + 5 });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when get following posts" });
  }
});

router.post("/follow/:id", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'User follow users'
  /*  
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      description: 'User Object ID string.'
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */

  const id = req.params.id;
  const followings = req.user.followings;

  if (!id) {
    // #swagger.responses[400] = { description: 'Please provide user id to follow' }
    return res
      .status(400)
      .send({ message: "Please provide user id to follow" });
  }

  if (req.user._id.toString() === id) {
    // #swagger.responses[400] = { description: 'User should not follow him or herself' }
    // #swagger.responses[400] = { description: 'User should not follow him or herself && Please provide user id to follow other users' }
    return res
      .status(400)
      .send({ message: "User should not follow him or herself" });
  }

  const authorIndex = followings.findIndex(
    (author) => author.toString() === id
  );

  // if user didn't follow this author -> now following
  if (authorIndex === -1) {
    followings.push(id);
  }
  // if user followed this author -> now unfollowing
  else {
    followings.splice(authorIndex, 1);
  }

  try {
    await req.user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error saving changes to mongodb' }
    return res
      .status(500)
      .send({ message: "Some errors occur in follow user" });
  }

  const message =
    authorIndex === -1
      ? `${req.user._id} follows ${req.params.id}.`
      : `${req.user._id} unfollows ${req.params.id}.`;

  // #swagger.responses[200] = { description: 'Success' }
  return res.send({ message });
});

router.get("/recommended", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get recommended writers'

  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  let users = [];
  try {
    users = await User.find().limit(10);
    users = await users.map((user) => user.getPublicProfile());
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error while finding in mongoose.' }
    return res
      .status(500)
      .send({ message: "Error while get recommended users" });
  }

  // #swagger.responses[200] = { description: 'Successfully recommend users' }
  res.send(users);
});

router.post("/change-password", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'User change password'
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
   */
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/ChangePassword"
          }  
        }
      }
    }
  */
  const { oldPassword, password } = req.body;
  const user = req.user;

  if (!oldPassword || !password) {
    return res
      .status(400)
      .send({ message: "Please provide both old password and new password" });
  }

  const isSamePassword = await bcrypt.compare(oldPassword, user.password);

  if (!isSamePassword) {
    // #swagger.responses[400] = { description: 'Typed in wrong password' }
    return res.status(400).send({ message: "Wrong password." });
  }

  if (password !== password2) {
    // #swagger.responses[400] = { description: 'The password and password2 is not match' }
    // #swagger.responses[400] = { description: 'Typed in wrong password or the password and password2 is not match' }
    return res.status(400).send({ message: "Your new password must match!" });
  }

  user.password = password;
  await user.hashPassword();

  try {
    await user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Saving user to mongodb has some errors' }
    return res
      .status(500)
      .send({ message: "Some errors occured when changing the password" });
  }

  // #swagger.responses[200] = { description: 'Saving changed password successfully' }
  return res.send({ message: "Change the password successfully" });
});

module.exports = router;
