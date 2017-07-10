'use strict';
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

var visit = {};

function _getCurrentDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today;
}

visit.getForm = function(req, res){
  let place = "";
  
  if(req.query.place != null){
    console.log(req.query.place);
    place = req.query.place;
  }
  if(req.query.date != null){
    console.log(req.query.date);
    let date = req.query.date;
  }  
  
  function _render(err, result){
    if(err) {
      console.error(err);
      res.send("ERROR" + err);
    } else {
      let currentDate = _getCurrentDate();
      let placeList = result.rows;
      let isVis = "not-visible";
      let errMsg = "";

      console.log(currentDate);

      res.render("add-visit", {
       placeList: placeList,
       place:place,
       currentDate:currentDate,
       isVis:isVis,
       errMsg:errMsg
     });
    }
  }
  console.log(q.getNames);
  pool.query(q.getNames, _render);
}

// This function works but is not robust.
// Need to figure out how to handle username
visit.post = function(req, res) {

  console.log(req.body);
  const query = {
    text: q.insertVisit, //VALUES example: (travis, Nay Aug Park, 2011-2-3 )
    values: [req.body.name, req.body.place, req.body.date]
  }
  pool.query(query)
    .then(req => {
      let isVis = "not-visible";
    })
    .catch(error =>  {

      res.send("Whoops"); //remove this later

      let isVis = "visible";
      console.error(error.code)
      let errMsg = "Something went wrong, sorry.";
      if(error.code === "23505") {

        errMsg = "Sorry, " + req.name + ". But You've alredy visited"
        + req.place + " on " + req.date + ".";

        console.log("Duplicate Error");
        res.status(500);
        res.render("add-visit", {
          placeList: placeList,
          currentDate:currentDate,
          errMsg:errMsg,
          isVis:isVis
        })
      }
    })
}

module.exports = visit;

