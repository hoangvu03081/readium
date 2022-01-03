const serverUrl = process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.SERVER_URL;
const clientUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.CLIENT_URL;

module.exports = {
  serverUrl,
  clientUrl,
};
