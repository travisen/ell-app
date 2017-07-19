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

admin.visits = function(req, res) {
    res.render("admin-views/admin-visits");
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

admin.addUser = function(req, res) {
    console.log("body", req.body);

    let first = req.body.firstName.toLowerCase();
    let last = req.body.lastName.toLowerCase();
    let password = req.body.password;

    if (password != "scola12") {

        let errMsg = "Incorrect password. Place contact SCOLA";
        res.status(400).send({msg: errMsg});
        return;
    }

    let username = first + last[0] + 1;

    const query = {
        text: q.addUser, //VALUES example: (travis, Nay Aug Park, 2011-2-3 )
        values: [first, last, username]
    }

    first = capitalizeFirstLetter(first);
    last = capitalizeFirstLetter(last);

    pool.query(query)
    .then(req => {

        let successMsg = "You added the following user: "
         + first + " " + last + "!";
        res.status(200).send({msg: successMsg});
    })
    .catch(error =>  {
        console.error(error.code);
        console.error(typeof(error.code));
        let errMsg = "Something went wrong, sorry. Try refreshing the page.";
        //Duplicate Person
        if(error.code === "23505") {
            errMsg = username + " already exists.";
            console.log("Duplicate Error");
            res.status(400).send({msg: errMsg});
        }    
        //All other errors
        else {
            res.status(400).send({msg: errMsg});
        }
    })
}

admin.getVisits = function(req, res) {

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

    pool.query(q.getVisitsMostRecent, sendData);

    // let searchType = req.params.type;

    // if (searchType === "play"){
    //     pool.query(q.play, sendData); 
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
    //     res.send("Whoops");
    // }
}


module.exports = admin;