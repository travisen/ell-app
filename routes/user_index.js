var express       = require("express"),
    places        = require("../controllers/places"),
    leaderboard   = require("../controllers/leaderboard"),
    landing       = require("../controllers/landing"),
    visit         = require("../controllers/add-visit");


var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var router = express.Router();

// Routes
router.get("/", landing.get);

router.get("/find", function(req, res){
    res.render("what-do");
});

router.get("/add-visit", visit.getForm);

router.post("/add-visit", urlencodedParser, visit.post);

router.get("/leaderboard", leaderboard.get);
//Review getting data from parameters.
//Ensure it is secure.
router.get("/find/:type", places.get);

router.get("/find/:type/:id", places.getDetails);

module.exports = router;