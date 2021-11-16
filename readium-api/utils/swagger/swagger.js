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
      name: "Auth",
      description: "Auth endpoints",
    },
    {
      name: "User",
      description: "Users' endpoints",
    },
    {
      name: "Dev",
      description: "Testing routes",
    },
  ],
  definitions: {
    User: {
      $email: "john@example.com",
      $fullname: "John Doe",
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
      activation_link: "http://localhost:5000/auth/activate/:id",
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
      $fullname: "John Doe",
    },
    LoginUser: {
      $email: "john@example.com",
      $password: "testing",
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