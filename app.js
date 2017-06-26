var express = require("express");
var app = express();
var pg = require("pg")

app.set("view engine", "ejs");

//Declare static directory for custom stylesheets
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    // res.send("Index page!");
    res.render("landing");
});

app.get("/find", function(req, res){
    // res.send("Index page!");
    res.render("what-do");
});

app.get("/addplace", function(req, res){
    // res.send("Index page!");
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

app.get("/admin", function(req, res){
    // res.send("Index page!");
    res.render("admin");
});


//Test db
app.get('/db', function (request, response) {
  console.log(process.env.DATABASE_URL);

  if(process.env.DATABASE_URL != undefined){
    host = process.env.DATABASE_URL;
  } else {
    host = "localhost"
  }

  pg.connect(host, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send({results: result.rows}); }
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