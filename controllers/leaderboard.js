'use strict';
const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const capitalizeFirstLetter = require("../utils/strings");

var leaderBoard = {};

var d = new Date();
var month = new Array();
month[0] = "Out of Range";
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";

leaderBoard.get = function(req, res) {

	function _render(err, result){
	  if(err){
	    console.error(err);
	    res.send("ERROR" + err);
	  } else {
	    let leaders = result.rows

	    res.render("leaderboard", {
	      header: header, 
	      leaders: leaders 
	    });
	  }
	}
	let monthNumber = d.getMonth() + 1;
	let header = month[monthNumber];

	const query = {
	  text: q.leaders,
	  values: [monthNumber]
	}

	console.log(query.values);

	pool.query(query, _render)
}
module.exports = leaderBoard;