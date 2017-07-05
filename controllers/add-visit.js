'use strict';
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

var visit = {};

visit.getForm = function(req, res){
  function _render(err, result){
    if(err) {
      console.error(err);
      res.send("ERROR" + err);
    } else {

      let placeList = result.rows
      // console.log(placeList);
      res.render("add-visit", {placeList: placeList});
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

