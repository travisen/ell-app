const express = require('express');
const places = require('../controllers/places');
const leaderboard = require('../controllers/leaderboard');
const landing = require('../controllers/landing');
const visit = require('../controllers/add-visit');
const signup = require('../controllers/sign-up');

const bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

// Disable well behaved robots from indexing
router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

router.get('/', landing.get);

router.get('/find', (req, res) => {
  res.render('what-do');
});
router.get('/add-visit', urlencodedParser, visit.getForm);
router.post('/add-visit', urlencodedParser, visit.post);
router.get('/leaderboard', leaderboard.get);
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', urlencodedParser, signup.post);

router.get('/find/:type', places.get);
router.get('/find/:type/:id', places.getDetails);

module.exports = router;
