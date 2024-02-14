module.exports = require("express-session")({
  secret: process.env.USER_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});