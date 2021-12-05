const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./utils/swagger/swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Readium API",
    description: "Handsome backend devs",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  // consumes: ["application/json", "multipart/form-data"],
  // produces: ["application/json", "image/png"],
  tags: [
    {
      name: "Comment",
      description: "Comments' related endpoints",
    },
    {
      name: "Post",
      description: "Posts' related endpoints",
    },
    {
      name: "Auth",
      description: "Auth endpoints",
    },
    {
      name: "User",
      description: "Users' endpoints",
    },
    {
      name: "Profile",
      description: "Users' profiles related endpoints",
    },
    {
      name: "Collection",
      description: "Users' collections related endpoints",
    },
    {
      name: "Dev",
      description: "Testing routes",
    },
  ],
  definitions: {
    User: {
      $email: "john@example.com",
      $displayName: "John Doe",
      password: "johnpassword",
      biography: "Hello, I'm a software engineer",
      job: "Software enginner",
      avatar: "bytes",
      followers: ["user1Id", "user2Id"],
      followings: ["user1Id", "user2Id"],
      notifications: [
        // limit to 50 notifications, no longer than 3 months
        {
          user: "user1Id",
          content: "user1 hates you",
          url: "http://localhost:5000/hackyourfacebook",
        },
      ],
      activationLink: "http://localhost:5000/auth/activate/:id",
      activated: false,
      collections: [
        {
          name: "Default Collection",
          posts: [],
        },
      ],
    },
    RegisterUser: {
      $email: "john@example.com",
      $password: "testing",
    },
    LoginUser: {
      $email: "john@example.com",
      $password: "testing",
    },
    ChangePassword: {
      $oldPassword: "testing",
      $password: "testing123",
    },
    ResetPassword: {
      $password: "testing123",
    },
    EditProfile: {
      displayName: "John Updated Doe",
      biography: "I'm being updated in Edit profile endpoint.",
      job: "Neet",
      facebook: "https://www.example.com",
      twitter: "https://www.example.com",
      instagram: "https://www.example.com",
      mail: "the@example.com",
    },
    Email: {
      $email: "john@example.com",
    },
    PostToCollection: {
      $postId: "post object id",
      $collectionName: "collection name",
    },
    Comment: {
      $content: "Comment Content",
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer", // name of the header, query parameter or cookie
      bearerFormat: "JWT",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
