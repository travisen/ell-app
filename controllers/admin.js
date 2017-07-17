'use strict';
var bodyParser = require('body-parser')

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const capitalizeFirstLetter = require("../utils/strings");

var admin = {};

admin.landing = function(req, res) {

}

module.exports = admin;