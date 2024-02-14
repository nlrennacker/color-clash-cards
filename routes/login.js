const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");

/**
 * POST /api/login
 * 
 * Request body must be a JSON object containing the keys "username", and "password".
 * Creates a user session on successful authentication (response contains session cookie).
 */
router.post("/", passport.authenticate("local"), (req, res, next) => {
  return res.status(200).send();
});

module.exports = router;