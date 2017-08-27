const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Imported queries
const q = require('../psql/queries');
const pool = require('../psql/db_setup.js');

// Expose this function to our app using module.exports
module.exports = function () {
  // Used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // Used to deserialize the user
  passport.deserializeUser(function (id, done) {
    pool.query("select * from users where id = " + id, function (err, rows) {
    done(err, rows[0]);
    });
  });
  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, username, password, done) { // callback with email and password from our form
    connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function (err, rows) {
      if (err)
          return done(err);
      if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }

      // if the user is found but the password is wrong
      if (!(rows[0].password == password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, rows[0]);
    });
  }));
};

// Define new local strategy using passport
passport.use(new LocalStrategy(
  (username, password, done) => {
    log.debug('Login process:', username);
    const query = {
      text: q.insertVisit,
      values: [username, verifyPassword]
    }
    pool.query()
      .then((result) => ({
        return done(null, result),
      }))
      .catch((err) => {
        log.error("/login: " + err);
        return done(null, false, { message: 'Wrong user name or password' });
      });
  }));
