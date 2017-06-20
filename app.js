var express = require("express");
var app = express();
var pg = require("pg")


app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("Index page!");
    res.render("landing");
});

app.get("/admin", function(req, res){
    // res.send("Index page!");
    res.render("admin");
});


//Test db
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
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