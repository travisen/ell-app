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

visit.post = function(req, res) {
  console.log(req.body);
  res.send("Thanks, " + req.body.name);
  const query = {
    text: q.insertVisit,
    values: [1, 1, '2011-1-3']
  }
  pool.query(query);
}

module.exports = visit;

