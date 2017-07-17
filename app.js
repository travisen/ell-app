"use strict";
var express       = require("express"),
    app           = express(),
    favicon       = require('serve-favicon'),
    path          = require('path'),
    bodyParser    = require('body-parser');

var placeRoutes  = require("./routes/user_index"); 
var adminRoutes = require("./routes/admin_index");

app.set("view engine", "ejs");

//Declare static directory for custom stylesheets
app.use(express.static(__dirname + "/public"));
//Link to favicon
//Setup error handling here. Don't want this to prevent server startup.
app.use(favicon(path.join(__dirname, 'public', 'favicon-globe.ico')))

app.use(placeRoutes);

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

//Admin pages which require authentication.

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