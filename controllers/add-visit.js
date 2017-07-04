'use strict';

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
      console.log(placeList);
      res.render("add-visit", {placeList: placeList});
    }
  }
  console.log(q.getNames);
  pool.query(q.getNames, _render);
}

module.exports = visit;