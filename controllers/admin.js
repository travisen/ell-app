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

admin.login = function(req, res) {
    res.render("admin-views/admin-login");
}

admin.incorrect= function(req, res){
    console.log("HELLO");
    res.render("admin-views/incorrect");
}

admin.stats = function(req, res) {
    res.render("admin-views/admin-stats");
}

admin.TotalVisitsAll = function(req, res) {
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

    pool.query(q.mostVisitedPlaces, sendData); 
}

// admin.TotalVisitsUser

// admin.MostVisitedThisWeek

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

admin.destroyPlace = function(req, res){
    console.log(req.params);
    let id = req.params.id;
    console.log(id);
    const query = {
        text: q.destroyPlace, 
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

admin.destroyVisit = function(req, res){
    console.log("destroy visits");
    console.log(req.params);
    let id = req.params.id;
    console.log(id);
    const query = {
        text: q.destroyVisit, 
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

function makeQuery(queryType, id, data){     
    const query = {
        text: queryType,
        values: [data, id]
    }
    return query;
}

admin.editPlace = function(req, res){

    let id = req.params.id;
    let type = req.params.edittype;
    
    console.log("id", id);
    console.log("id", type);

    if(req.body.data == null) {
        console.log("data body is null");
        return;
    }

    if(type != "description")
        var data = req.body.data.toLowerCase();
    else
        var data = req.body.data

    if(type === "name"){
        let query = makeQuery(q.updateName, id, data);
        pool.query(query, _render);
    }
    else if(type === "place_type"){
        let query = makeQuery(q.updatePlaceType, id, data);
        pool.query(query, _render);
    } 
    else if(type === "cost"){
        let query = makeQuery(q.updateCost, id, data);
        pool.query(query, _render);
    }
    else if(type === "street_address"){
        let query = makeQuery(q.updateStreet, id, data);
        pool.query(query, _render);
    }
    else if(type === "city"){
        let query = makeQuery(q.updateCity, id, data);
        pool.query(query, _render);
    }
    else if(type === "state"){
        let query = makeQuery(q.updateState, id, data);
        pool.query(query, _render);
    }
    else if(type === "zipcode"){
        let query = makeQuery(q.updateZip, id, data);
        pool.query(query, _render);
    }
    else if(type === "phone"){
        let query = makeQuery(q.updatePhone, id, data);
        pool.query(query, _render);
    }
    else if(type === "description"){
        let query = makeQuery(q.updateDescription, id, data);
        pool.query(query, _render);
    }          
    else{
        res.status(400).send("Invalid field");
    }

    function _render(err, result){
        if(err){
            console.error(err);
            res.render("admin-views/failure");
        } 
        else {
            res.render("admin-views/success");
        }
    }
}

admin.getEditPlace = function(req, res){

    let id = req.params.id;

    function _render(err, result){
        if(err){
            console.error(err);
            res.send("ERROR" + err);
        } 
        else {
            let placeDetails = result.rows[0];
            console.log(placeDetails);

            res.render("admin-views/edit-place", { placeDetails: placeDetails });
        }
    }
    const query = {
        text: q.getById,
        values: [id]
    }

    pool.query(query, _render);
}

/* Json data post routes */
admin.allPlaces = function(req, res) {

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
        if(error.code == 23505){
            res.status(400).send( {msg: "Sorry, but an entry for " + name + " already exists."});
        } 
        else{
            console.log(error);
            res.status(400).send( {msg: "Something went terribly wrong!"});
        }
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
            res.send(placeList);            
        }
    }

    pool.query(q.getVisitsMostRecent, sendData);
}


module.exports = admin;