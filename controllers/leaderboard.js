'use strict';
const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

var leaderBoard = {};

var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

leaderBoard.get = function(req, res) {

	function _render(err, result){
	  if(err){
	    console.error(err);
	    res.send("ERROR" + err);
	  } else {
	    let leaders = result.rows
	    console.log(leaders);
	    let header = month[d.getMonth()];

	    res.render("leaderboard", {
	      header: header, 
	      leaders: leaders 
	    });
	  }
	}

	pool.query(q.leaders, _render)
}
module.exports = leaderBoard;