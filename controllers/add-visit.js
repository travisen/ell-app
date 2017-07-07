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
  function _render(err, result){
    if(err) {
      console.error(err);
      res.send("ERROR" + err);
    } else {
      let currentDate = _getCurrentDate();
      let placeList = result.rows;

      console.log(currentDate);

      res.render("add-visit", {placeList: placeList,
       currentDate:currentDate});
    }
  }
  console.log(q.getNames);
  pool.query(q.getNames, _render);
}

// This function works but is not robust.
// Need to figure out how to handle username
visit.post = function(req, res) {
  console.log(req.body);
  res.send("Thanks, " + req.body.name);
  const query = {
    text: q.insertVisit, //VALUES example: (travis, Nay Aug Park, 2011-2-3 )
    values: [req.body.name, req.body.place, req.body.date]
  }
  pool.query(query);
}

module.exports = visit;

