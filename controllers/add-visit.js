'use strict';
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries

var visit = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function _getCurrentDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;

  return today;
}

visit.getForm = function(req, res){
  let place = "";
  
  if(req.query.place != null){
    console.log(req.query.place);
    place = req.query.place;
  }
  if(req.query.date != null){
    console.log(req.query.date);
    let date = req.query.date;
  }  
  
  function _render(err, result){
    if(err) {
      console.error(err);
      res.send("ERROR" + err);
    } else {
      let currentDate = _getCurrentDate();
      let placeList = result.rows;
      let isVis = "not-visible";
      let errMsg = "";

      console.log(currentDate);

      res.render("add-visit", {
       placeList: placeList,
       place:place,
       currentDate:currentDate,
       isVis:isVis,
       errMsg:errMsg
     });
    }
  }
  console.log(q.getNames);
  pool.query(q.getNames, _render);
}

// This function works but is not robust.
// Need to figure out how to handle username
visit.post = function(req, res) {

  console.log("body", req.body);

  let name = req.body.name.toLowerCase();
  let place = req.body.place.toLowerCase();
  let date = req.body.date;
  const query = {
    text: q.insertVisit, //VALUES example: (travis, Nay Aug Park, 2011-2-3 )
    values: [name, place, date]
  }

  name = capitalizeFirstLetter(name);
  //place = capitalizeFirstLetter(place);

  pool.query(query)
    .then(req => {

      let successMsg = name + ", thanks for adding your visit to " + place +
      " on " + date + "!";
      console.log(successMsg);
      res.status(200).send({msg: successMsg});
    })
    .catch(error =>  {
      let isVis = "visible";
      console.error(error.code)
      let errMsg = "Something went wrong, sorry. Try refreshing the page.";
      //Duplicate Visit
      if(error.code === "23505") {

        errMsg = "Sorry, " + name + ". But you've already visited "
        + place + " on " + date + ".";

        console.log("Duplicate Error");
        res.status(400).send({msg: errMsg});
      }
      //Name does not exist
      else if (error.code === "23502") {
        errMsg = "Sorry, but, " + name + " is not a current user" +
        " please check that your name is entered correctly.";

        console.log("Name Error");
        res.status(400).send({msg: errMsg});
      } 
      //Place does not exist
      else if (error.code === "23505" ) {
        errMsg = "Sorry, " + name + " but " + place +
        " does not exist. Please make sure that place is entered correctly.";
         res.status(400).send({msg: errMsg});
      }
      //All other errors
      else {
        res.status(400).send({msg: errMsg});
      }
    })
}

module.exports = visit;

