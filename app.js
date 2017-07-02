"use strict";
var express       = require("express"),
    app           = express(),
    pg            = require("pg"),
    favicon       = require('serve-favicon'),
    path          = require('path');

//Setup DB pool
const Pool        = require("pg-pool"),
      url         = require("url"),
      params = url.parse(process.env.DATABASE_URL),
      auth = params.auth.split(":");

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  ssl: true
};

const pool = new Pool(config);

app.set("view engine", "ejs");

//Declare static directory for custom stylesheets
app.use(express.static(__dirname + "/public"));
//Link to favicon
//Setup error handling here. Don't want this to prevent server startup.
app.use(favicon(path.join(__dirname, 'public', 'favicon-globe.ico')))


// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/find", function(req, res){
    res.render("what-do");
});

app.get("/add-visit", function(req, res){
    res.render("add-visit");
});

app.post("/add-visit", function(req, res){

});

app.get("/play", function(req, res){
  pool.query('SELECT * FROM place;', function(err, result) {
    if(err){
      console.error(err);
      res.send("ERROR" + err);
    } else {
      // res.send({results: result.rows});
      let unParsedData = result.rows;
      // console.log(unParsedData);
      console.log(result.rowCount);
      let places = [];
      for (let i = 0; i < result.rowCount; i++) {
        places[i] = []; //Initialize row
        places[i].name = unParsedData[i].name;
        places[i].description = unParsedData[i].description;
        places[i].street_address = unParsedData[i].street_address;
        places[i].city = unParsedData[i].city;
        places[i].state = unParsedData[i].state,
        places[i].zipcode = unParsedData[i].zipcode;
      }

      res.render("list-places", { places: places });
    }

    });
   // res.render("list-places");
});


app.get("/eat", function(req, res){

});

app.get("/shop", function(req, res){

});

app.get("/other", function(req, res){

});

//Admin pages which require authentication.

app.get("/admin", function(req, res){
    res.render("admin");
});




//Test db
// app.get('/db', function (request, response) {

//   pg.defaults.ssl = true;

//   pg.connect(process.env.DATABASE_URL, function(err, client) {
//     if (err) throw err;
//     console.log('Connected to postgres! Getting data from users:');

//     client.query('SELECT * FROM person;', function(err, result) {
//       if(err) {
//         console.error(err);
//         response.send("Error" + err);
//       }
//       else {
//         response.send({results: result.rows});
//       }
//     });
//   });
  
// });
//Test db

app.get('/db', function (request, response) {

  //  pool.connect().then(client => {
  //   client.query('SELECT * FROM person;', function(err, result) {
  //     if(err) {
  //       console.error(err);
  //       response.send("Error" + err);
  //     }
  //     else {
  //       response.send({results: result.rows});
  //     }
  //   });
  // });

  pool.query('SELECT * FROM person;', function(err, result) {
    if(err){
      console.error(err);
      response.send("ERROR" + err);
    } else {
      response.send({results: result.rows});
    }

    });
});

// Page does not exist
app.get("/*", function(req, res){
    // res.send("Index page!");
    res.render("not-found");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// app.listen(process.env.PORT || 3000 , function(){
//     if (process.env.PORT != null){
//         var port = process.env.PORT;
//     } else {
//         var port = 3000;
//     }
//     console.log("Server started on port: %d", port);
// });