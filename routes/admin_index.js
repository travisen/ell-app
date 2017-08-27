const express = require('express');
const admin = require('../controllers/admin');
const stats = require('../controllers/stats');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Setup database
const pool = require('../psql/db_setup.js');
// Import queries
const q = require('../psql/queries');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.use(session({
  secret: 'I really like my cat!',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 60000 * 30, secure: false },
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Set which strategy to use
passport.use(new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    const query = {
      text: q.getAdmin2,
      values: [username],
    };
    pool.query(query, (err, data) => {
      if (data.rows[0] != null) {
        console.log(data.rows[0]);
        const user = data.rows[0];

        if (password === user.password) {
          console.log('Passwords match');
          done(null, user);
        } else {
          done(null, false, '/admin/incorrect');
        }
      } else {
        console.log('Incorrect');
        done(null, false, '/admin/incorrect');
      }
    });
  }));

router.post('/admin/login', urlencodedParser,
  passport.authenticate('local', {
    successRedirect: '/admin/places',
    failureRedirect: '/admin/incorrect',
  }));

// Middleware to check if user is logged in.
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('admin-views/not-logged');
  }
}

// Login and passport routes
router.get('/admin/incorrect', admin.incorrect);
router.get('/admin/login', admin.login);

// Place Routes
router.get('/admin/places', checkAuth, admin.places);
router.get('/admin/places/:id/stats', urlencodedParser, stats.placeSpecific);
router.post('/admin/places/add', checkAuth, urlencodedParser, admin.addPlace);
router.get('/admin/places/edit/:id', checkAuth, urlencodedParser, admin.getEditPlace);
router.post('/admin/places/edit/:id/:edittype',
  checkAuth, urlencodedParser, admin.editPlace);
router.post('/admin/place/:id/delete', checkAuth, admin.destroyPlace);

// People Routes
router.get('/admin/people', checkAuth, admin.people);
router.get('/admin/places/:type', checkAuth, admin.allPlaces);
router.post('/admin/people/:id/delete', checkAuth, admin.destroyUser);
router.get('/admin/users/', admin.allPeople);
router.post('/admin/users/add', checkAuth, urlencodedParser, admin.addUser);

// Visit Routes
router.post('/admin/visits/:id/delete', checkAuth, admin.destroyVisit);
router.get('/admin/visits/:type', checkAuth, admin.getVisits);
router.get('/admin/visits', checkAuth, admin.visits);

router.get('/admin/stats', admin.stats);

module.exports = router;
