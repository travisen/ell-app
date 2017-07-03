'use strict';
const pool = require("../psql/db_setup.js");

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

	pool.query(
	  "SELECT person.id, person.first_name, COUNT(person_visit.person_id) AS visits FROM person LEFT JOIN person_visit ON person.id = person_visit.person_id AND EXTRACT(MONTH FROM person_visit.visited_on) = 6 GROUP BY person.id HAVING COUNT(person_visit.person_id) > 0 ORDER BY visits DESC;",
	   _render)
}
module.exports = leaderBoard;