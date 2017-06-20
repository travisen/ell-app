var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("Index page!");
    res.render("landing");
});

app.get("/admin", function(req, res){
    // res.send("Index page!");
    res.render("admin");
});

// Page does not exist
app.get("/*", function(req, res){
    // res.send("Index page!");
    res.render("not-found");
});

app.listen(process.env.PORT || 3000 , function(){
    if (process.env.PORT != null){
        var port = process.env.PORT;
    } else {
        var port = 3000;
    }
    console.log("Server started on port: %d", port);
});