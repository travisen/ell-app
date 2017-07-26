var express       = require("express"),
    admin         = require("../controllers/admin")
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    localStrategy = require('passport-local').Strategy;

//Import db
const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

//router.get("/admin", admin.landing);


//Initialize passport

//Setup session
// router.use(session({
//     secret: "I really like my cat!",
//     resave: true,
//     saveUninitialized: false,
//     cookie: {maxAge: 60000, secure: false }
// }));
router.use(session({
    secret: "I really like my cat!",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false }
}));
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('called deserializeUser');
    console.log(user);
    console.log('called deserializeUser - pg');

    done(null, user);
});


//Set which strategy to use
passport.use(new localStrategy(
    { passReqToCallback: true },
    function(req, username, password, done) {

        const query = {
            text: q.getAdmin2, 
            values: [username]
        }

        pool.query(query, (err, data) => {
            //console.log(data.rows[0]);
            let user = data.rows[0];
            if(password == user.password){
                console.log("Passwords match");
                done(null, user);
            } 
            else {
                done(null, false, { message: "Incorrect username and/or password." });
            }
        });
    }
));

router.post('/admin/login', urlencodedParser,
    passport.authenticate('local', {
        successRedirect: '/admin/places',
        failureRedirect: '/admin/incorrect'
    })
);

router.get("/admin/incorrect", admin.incorrect);


router.get("/admin/login", admin.login);

router.get("/admin/places", passport.authenticate('local'), admin.places);

router.post("/admin/places/add", urlencodedParser, admin.addPlace)

router.get("/admin/people", passport.authenticate('local'), admin.people);

//Api Route
router.get("/admin/places/:type", admin.allPlaces);

router.get("/admin/users/", admin.allPeople);

//Api Route
router.post("/admin/users/add", urlencodedParser, admin.addUser)

//Api Route
router.post("/admin/people/:id/delete", admin.destroyUser);

router.post("/admin/place/:id/delete", admin.destroyPlace);

router.post("/admin/visits/:id/delete", admin.destroyVisit);

//Api Route
router.get("/admin/visits/:type", admin.getVisits)

router.get("/admin/visits", admin.visits);

module.exports = router;
