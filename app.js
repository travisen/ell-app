var express = require("express");
var app = express();
var pg = require("pg")

app.set("view engine", "ejs");

//Declare static directory for custom stylesheets
app.use(express.static(__dirname + "/public"));


// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/find", function(req, res){
    res.render("what-do");
});

app.get("/addplace", function(req, res){
    res.render("add-place");
});

app.post("/addplace", function(req, res){

});

app.get("/play", function(req, res){

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
app.get('/db', function (request, response) {

  pg.defaults.ssl = true;

  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting data from users:');

    client.query('SELECT * FROM users;', function(err, result) {
      if(err) {
        console.error(err);
        response.send("Error" + err);
      }
      else {
        response.send({results: result.rows});
      }
    });
  });
  
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