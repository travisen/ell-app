'use strict';

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

admin.destroyUser = function(req, res){
    console.log(req.params);
    let id = req.params.id;
    console.log(id);
    const query = {
        text: q.destroyUser, 
        values: [id]
    }

    pool.query(query)
    .then(req => {
        res.status(200).send("Successfully deleted entry!");
    })
    .catch(error =>  {
        console.log(error);
        res.status(400).send("Failed to delete entry");
    }) 
};

/* Json data post routes */
admin.allPlaces = function(req, res) {

    function sendData(err, result) {
        if(err){
            console.error(err);
            res.send("ERROR" + err);
        } else {
            
            let placeList = result.rows
            //console.log(placeList);
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
        res.send("Whoops");
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
    
}

admin.addPlace = function(req, res) {
    // console.log(req);
    console.log(req.body);
    let name = req.body.name.toLowerCase();
    let place_type = req.body.place_type.toLowerCase();
    let street_address = req.body.street_address;
    let city = req.body.city;
    let zipcode = parseInt(req.body.zipcode);
    let description = req.body.description;
    let phone = req.body.phone;
    let cost = req.body.cost;
    // (name, place_type, street_address,
    // city, zipcode, description, phone, cost)
    const query = {
        text: q.addPlace, 
        values: [name, place_type, street_address, city, zipcode,
        description, phone, cost]
    }

    pool.query(query)
    .then(req => {
        let resStr = name + " added successfully!";
        res.status(200).send({msg: resStr});
    })
    .catch(error =>  {
        console.log(error);
        res.status(400).send( {msg: "Something went terribly wrong, doh!"});
    }) 
}


module.exports = admin;