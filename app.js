"use strict";
var express       = require("express"),
    app           = express(),
    pg            = require("pg"),
    favicon       = require('serve-favicon'),
    path          = require('path');

var placeRoutes  = require("./routes/places") 

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

app.use(placeRoutes);

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

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

app.listen(process.env.PORT || 3000 , function(){
    if (process.env.PORT != null){
        var port = process.env.PORT;
    } else {
        var port = 3000;
    }
    console.log("Server started on port: %d", port);
});