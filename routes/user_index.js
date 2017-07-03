var express = require("express");
var places  = require("../controllers/places");
var router = express.Router();

// Routes
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/find", function(req, res){
    res.render("what-do");
});

router.get("/add-visit", function(req, res){
    res.render("add-visit");
});

router.post("/add-visit", function(req, res){

});

//Review getting data from parameters.
//Ensure it is secure.
router.get("/find/:type", places.get);

module.exports = router;