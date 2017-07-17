$(document).ready(function() {
    console.log("Jquery Connected!");
});

// testArr = [{"id":8,"first_name":"denise","last_name":"evans","username":"denisee"},{"id":31,"first_name":"wat","last_name":"lolwat","username":"watl1"},{"id":23,"first_name":"theodore","last_name":"mcdonald","username":"theodorem1"},{"id":32,"first_name":"jessica","last_name":"nykaza","username":"jessican1"},{"id":5,"first_name":"travis","last_name":"nykaza","username":"nykazat1"},{"id":14,"first_name":"teddy","last_name":"nykaza","username":"teddyn1"},{"id":7,"first_name":"eddard","last_name":"stark","username":"starke1"},{"id":6,"first_name":"sansa","last_name":"stark","username":"starks1"},{"id":28,"first_name":"test","last_name":"tester","username":"testt1"},{"id":30,"first_name":"tester","last_name":"tester","username":"testert1"},{"id":2,"first_name":"tony","last_name":"tiger","username":"tonyt1"},{"id":13,"first_name":"ted","last_name":"williams","username":"tedw1"},{"id":9,"first_name":"ed","last_name":"williams","username":"edw1"}];
// console.log(testArr[0]);

function generate_table() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.getElementById("mainTable");

  var tblBody = document.getElementById("bodyTable");
 
  // creating all cells
  for (var i = 0; i < testArr.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
 
    for (var property in testArr[i]) {
      let currRow = testArr[i];
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(currRow[property]);
      if (property === "id"){
          cell.className = "id";
      }
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

}

generate_table();