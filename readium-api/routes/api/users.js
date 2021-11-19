/**
 ** Authenticated users routes
 */

const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { authMiddleware } = require("../../utils/auth");
const validator = require("../../utils/validator/Validator");

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

  res.send({ message: ["User is authenticated"] });
});
/**
 *! Dev routes
 */

// didn't test
router.get("/following/posts", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get following posts from following authors'
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.parameters['page'] = {
      description: 'A page = 10 posts',
      in: 'query',
      type: 'integer',
    }
    #swagger.parameters['utc'] = {
      description: 'utc date string',
      in: 'query',
      type: 'string',
    }
   */

  // Date() === new Date(new Date().toUTCString()).toString()
  const { page = 1, utc = Date() } = req.query;

  const posts = [];
  const authors = req.user.followings;

  for (let i = 0; i < authors.length; i++) {
    try {
      const postsOfAuthor = await Post.find({
        author: authors[i],
        publishDate: { $lte: new Date(utc) },
      });
      posts.push(...postsOfAuthor);
      if (posts.length > page * 10) {
        posts.splice(page * 10);
        break;
      }
    } catch (err) {
      // #swagger.responses[500] = { description: 'Error finding in mongodb' }
      return res
        .status(500)
        .send({ message: ["Some errors occur in get following posts"] });
    }
  }

  // #swagger.responses[200] = { description: 'Successfully get posts' }
  return res.send(posts);
});

router.get("/follow/:id", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'User follow users'
  /*  
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      description: 'User Object ID string.'
    }
  */
  /*
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
      .send({ message: ["Please provide user id to follow"] });
  }

  if (req.user._id.toString() === id) {
    // #swagger.responses[400] = { description: 'User should not follow him or herself' }
    // #swagger.responses[400] = { description: 'User should not follow him or herself && Please provide user id to follow other users' }
    return res
      .status(400)
      .send({ message: ["User should not follow him or herself"] });
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
      .send({ message: ["Some errors occur in follow user"] });
  }

  const message = [
    authorIndex === -1
      ? `${req.user._id} follows ${req.params.id}.`
      : `${req.user._id} unfollows ${req.params.id}.`,
  ];

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
  } catch (err) {
    // #swagger.responses[500] = { description: 'Error while finding in mongoose.' }
    return res
      .status(500)
      .send({ message: ["Error while get recommended users"] });
  }

  // #swagger.responses[200] = { description: 'Successfully recommend users' }
  res.send(users);
});

router.patch("/profile", authMiddleware, async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Edit profile'
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
            $ref: "#/definitions/EditProfile"
          }  
        }
      }
    }
  */

  const { displayName, biography, job } = req.body;
  const user = req.user;

  user.displayName = displayName || user.displayName;
  user.biography = biography || user.biography;
  user.job = job || user.job;

  // validation for displayName
  validator.resetErrors();
  const isValid =
    validator.checkEmpty("displayName", user.displayName) &
    validator.validateDisplayName(user.displayName);

  if (!isValid) {
    // #swagger.responses[400] = { description: 'User input displayName with errors' }
    return res.status(400).send({ errors: validator.errors });
  }

  try {
    await user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Some errors occured when saving to mongodb' }
    return res
      .status(500)
      .send({ message: ["Some errors occured when editing the profile"] });
  }

  const resObj = {};
  if (displayName) resObj.displayName = displayName;
  if (biography) resObj.biography = biography;
  if (job) resObj.job = job;

  // #swagger.responses[200] = { description: 'Successfully edit profile' }
  return res.send(resObj);
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
  const { oldPassword, password, password2 } = req.body;
  const user = req.user;

  const isSamePassword = await bcrypt.compare(oldPassword, user.password);

  if (!isSamePassword) {
    // #swagger.responses[400] = { description: 'Typed in wrong password' }
    return res.status(400).send({ message: ["You typed in wrong password!"] });
  }

  if (password !== password2) {
    // #swagger.responses[400] = { description: 'The password and password2 is not match' }
    // #swagger.responses[400] = { description: 'Typed in wrong password or the password and password2 is not match' }
    return res.status(400).send({ message: ["Your new password must match!"] });
  }

  user.password = password;

  try {
    await user.save();
  } catch (err) {
    // #swagger.responses[500] = { description: 'Saving user to mongodb has some errors' }
    return res
      .status(500)
      .send({ message: ["some errors occured when changing the password"] });
  }

  // #swagger.responses[200] = { description: 'Saving changed password successfully' }
  return res.send({ message: ["Change the password successfully"] });
});

module.exports = router;
