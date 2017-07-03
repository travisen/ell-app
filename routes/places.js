var express = require("express");
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
router.get("/find/:type", function(req, res){

  let searchType = req.params.type;
  if (searchType === "play"){
    pool.query(
      'SELECT name, description, street_address, city, state, zipcode, cost FROM place;', function(err, result) {
      if(err){
        console.error(err);
        res.send("ERROR" + err);
      } else {
        // res.send({results: result.rows});
        let unParsedData = result.rows;
        // console.log(unParsedData);
        console.log(result.rowCount);
        let places = [];
        for (let i = 0; i < result.rowCount; i++) {
          places[i] = []; //Initialize row
          places[i].name = unParsedData[i].name;
          places[i].description = unParsedData[i].description;
          places[i].street_address = unParsedData[i].street_address;
          places[i].city = unParsedData[i].city;
          places[i].state = unParsedData[i].state,
          places[i].zipcode = unParsedData[i].zipcode;
        }
        let header = searchType;
        res.render("list-places", {
          header: header, 
          places: places 
        });
      }

      }); 
  } else if (searchType === "eat") {

  } else if (searchType === "shop") {

  } else if (searchType === "other") {

  } else { // Page does not exist.
    res.redirect("/find");
  }

   // res.render("list-places");
});

module.exports = router;