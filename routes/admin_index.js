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
    rolling: true,
    cookie: {maxAge: 60000 * 2, secure: false }
}));
router.use(passport.initialize());
router.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
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

// Middleware to check if user is logged in.
function checkAuth (req, res, next) {
    if(req.isAuthenticated()){
        next();
    } 
    else {
        res.render("admin-views/not-logged");
    }
};

router.get("/admin/incorrect", admin.incorrect);

router.get("/admin/login", admin.login);

router.get("/admin/places", checkAuth, admin.places);

router.post("/admin/places/add", checkAuth, urlencodedParser, admin.addPlace)

router.get("/admin/people", checkAuth, admin.people);

//Api Route
router.get("/admin/places/:type", checkAuth, admin.allPlaces);

router.get("/admin/users/", admin.allPeople);

//Api Route
router.post("/admin/users/add", checkAuth, urlencodedParser, admin.addUser)

//Api Route
router.post("/admin/people/:id/delete", checkAuth, admin.destroyUser);

router.post("/admin/place/:id/delete", checkAuth, admin.destroyPlace);

router.post("/admin/visits/:id/delete", checkAuth, admin.destroyVisit);

//Api Route
router.get("/admin/visits/:type", checkAuth, admin.getVisits)

router.get("/admin/visits", checkAuth, admin.visits);

module.exports = router;
