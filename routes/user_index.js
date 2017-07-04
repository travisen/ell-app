var express       = require("express"),
    places        = require("../controllers/places"),
    leaderboard   = require("../controllers/leaderboard"),
    landing       = require("../controllers/landing");

var router = express.Router();

// Routes
router.get("/", landing.get);

router.get("/find", function(req, res){
    res.render("what-do");
});

router.get("/add-visit", function(req, res){
    res.render("add-visit");
});

router.post("/add-visit", function(req, res){

});

router.get("/leaderboard", leaderboard.get);
//Review getting data from parameters.
//Ensure it is secure.
router.get("/find/:type", places.get);

// router.get("/find/:type/:id", places.getDetails);

module.exports = router;