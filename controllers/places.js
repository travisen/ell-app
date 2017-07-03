'use strict';

const pool = require("../psql/db_setup.js");

var places = {};



places.get = function(req, res){

  function _render(err, result){
    if(err){
      console.error(err);
      res.send("ERROR" + err);
    } else {
      let placeList = result.rows
      let header = searchType;

      if (header === "other") {
        header = "do other things"
      }

      res.render("list-places", {
        header: header, 
        placeList: placeList 
      });
    }
  }

  let searchType = req.params.type;
  if (searchType === "play"){
    pool.query(
      "SELECT name, description, street_address, city, state, zipcode, cost FROM place WHERE place_type = 'play';",
       _render) 
  }
  else if (searchType === "eat") {
    pool.query(
      "SELECT name, description, street_address, city, state, zipcode, cost FROM place WHERE place_type = 'eat';",
       _render) 
  } else if (searchType === "shop") {
    pool.query(
      "SELECT name, description, street_address, city, state, zipcode, cost FROM place WHERE place_type = 'shop';",
       _render) 
  } else if (searchType === "other") {
    pool.query(
      "SELECT name, description, street_address, city, state, zipcode, cost FROM place WHERE place_type = 'other';",
       _render) 
  } else { // Page does not exist.
    res.redirect("/find");
  }
}

module.exports = places;