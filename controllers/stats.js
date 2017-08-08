'use strict';

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const capitalizeFirstLetter = require("../utils/strings");

var stats = {};

stats.placeSpecific = function(req, res) {

    let id = req.params.id;

    function _render(err, result){
        if(err){
            console.error(err);
            res.send("ERROR" + err);
        } 
        else {
            let placeStats = result.rows;
            console.log(result.rows[0].name);
            let name = capitalizeFirstLetter(result.rows[0].name);
            console.log(placeStats);

            res.render("admin-views/place-stats", { placeStats: placeStats,
            name: name });
        }
    }
    const query = {
        text: q.getPlaceVisits,
        values: [id]
    }

    pool.query(query, _render);
}

module.exports = stats;