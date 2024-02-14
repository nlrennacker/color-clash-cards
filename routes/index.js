var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/game', function(req, res, next) {
  res.render('game_screen', { title: 'Game' });
});

router.get('/registration', function (req, res, next) {
  res.render('registration', { title: "Account Register"});
});

router.get('/lobby', function(req, res, next) {
  res.render('lobby', {title: "User Lobby"});
});

module.exports = router;
