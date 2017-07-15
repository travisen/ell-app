'use strict';

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

var signup = {};

signup.post = function(req, res) {
    console.log("body", req.body);
}

module.exports = signup; 