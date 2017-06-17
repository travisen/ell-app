var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("Index page!");
    res.render("landing");
});

app.listen(3000, "localhost" ,function(){
    console.log("Server started on port 3000");
});