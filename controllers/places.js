'use strict';

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const request = require('request');


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

//Refactor this function
places.getDetails = function(req, res) {

  function _render(err, result){
    if(err){
      console.error(err);
      res.send("ERROR" + err);
    } 
    else {

      let directionStr = "http://maps.google.com?saddr=Current+Location&daddr="

      let placeDetails = result.rows[0];
      //Parse address for google maps query
      let addressArr = placeDetails.street_address.split(" ");

      addressArr.push(placeDetails.city, placeDetails.state,
        placeDetails.zipcode);

      let address =  addressArr.join(" ");

      for(var word in addressArr) {
        directionStr += "+";
        directionStr += addressArr[word];
      }

      console.log(directionStr);

      placeDetails.phoneAddr = placeDetails.phone;

      placeDetails.phone = "(" + placeDetails.phone.substring(0 , 3) + ")"
        + " " + placeDetails.phone.substring(3 , 6)
        + "-" + placeDetails.phone.substring(6 , 10);
       

      res.render("place-details", { placeDetails: placeDetails,
        directionStr: directionStr,
        address: address});
    }
  }
  var text = 'SELECT id, name, description, street_address, city, state, zipcode, cost FROM place WHERE id = ($1)'
  var num = Number(req.params.id);

  //possible pg bug. works with config object but not otherwise...
  const query = {
    text: q.getById,
    values: [num]
  }

  pool.query(query, _render);
}

module.exports = places;