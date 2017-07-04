'use strict';

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

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
    pool.query(q.play, _render); 
  }
  else if (searchType === "eat") {
    pool.query(q.eat, _render) 
  }
  else if (searchType === "shop") {
    pool.query(q.shop, _render) 
  }
  else if (searchType === "other") {
    pool.query(q.other, _render) 
  }
  else { // Page does not exist.
    res.redirect("/find");
  }
}

// places.getDetails = function(req, res) {
//   function _render(err, result){
//     if(err){
//       console.error(err);
//       res.send("ERROR" + err);
//     } 
//     else {
//       let placeDetails = result.rows
        
//       res.render("list-places", { placeDetails: placeDetails });
//     }
//   }
//   pool.query(q.getById, _render);
// }

module.exports = places;