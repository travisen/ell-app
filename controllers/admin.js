'use strict';
var bodyParser = require('body-parser')

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const capitalizeFirstLetter = require("../utils/strings");

var admin = {};

admin.landing = function(req, res) {
    res.render("admin-views/admin");
}

admin.places = function(req, res) {
    res.render("admin-views/admin-places");
}

admin.people = function(req, res) {
    res.render("admin-views/admin-people");
}

/* Json data post routes */
admin.allPlaces = function(req, res) {

    function sendData(err, result) {
        if(err){
            console.error(err);
            res.send("ERROR" + err);
        } else {
            
            let placeList = result.rows
            console.log(placeList);
            res.send(placeList);            
        }
    }
    let searchType = req.params.type;

    if (searchType === "play"){
        pool.query(q.play, sendData); 
    }
    else if (searchType === "eat") {
        pool.query(q.eat, sendData) 
    }
    else if (searchType === "shop") {
        pool.query(q.shop, sendData) 
    }
    else if (searchType === "other") {
        pool.query(q.other, sendData) 
    }
    else if(searchType === "all") {
        pool.query(q.allPlaces, sendData) 
    }
    else { 
        res.redirect("/admin");
    }
}

admin.allPeople = function(req, res) {

    function sendData(err, result) {
        if(err){
            console.error(err);
            res.send("ERROR" + err);
        } else {
            let placeList = result.rows
            res.send(placeList);            
        }
    }
    let searchType = req.params.type;

    pool.query(q.usersLastNameAtoZ, sendData);
    
    // if (searchType === "play"){
    //     pool.query(q.usersLastNameAtoZ, sendData); 
    // }
    // else if (searchType === "eat") {
    //     pool.query(q.eat, sendData) 
    // }
    // else if (searchType === "shop") {
    //     pool.query(q.shop, sendData) 
    // }
    // else if (searchType === "other") {
    //     pool.query(q.other, sendData) 
    // }
    // else if(searchType === "all") {
    //     pool.query(q.allPlaces, sendData) 
    // }
    // else { 
    //     res.redirect("/admin");
    // }
}


module.exports = admin;