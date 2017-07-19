$(document).ready(function() {
    console.log("Jquery Connected!");
});

/*
  Generate a button in the passed in row.
*/
function generateButton(row, id, type) {
  let cell = document.createElement("td");
  let button = document.createElement("BUTTON");
  button.innerHTML ="Delete";

  button.setAttribute("class", "btn btn-danger btn-sm");

  button.onclick = function() {deleteUser(id)}; //Assign function to button

  //button.setAttribute("class", "btn btn-info btn-sm");
  cell.appendChild(button);
  row.appendChild(cell);
}

function deleteUser(id){
  console.log(id);
  //admin-people/30/delete
  let urlType = "/admin-people/";
  let urlAction = "/delete";

  let url = urlType + id + urlAction;
  console.log(url);
  ajaxPostRequest(url);
  removeTable();
  ajaxGetRequest();
}
/* Submit AJAX post request on click */
function ajaxPostRequest(urlStr) {

  var url = urlStr;

  let request = $.post(url);

  request.error(function(jqXHR, textStatus, errorThrown) {
      if (textStatus == 'timeout')
          console.log('The server is not responding');

      if (textStatus == 'error')
          console.log(errorThrown);
  });
}
/* 
  Delete Table

*/
function removeTable() {
  var table = document.getElementById("mainTable");
  var tableBody = document.getElementById("bodyTable");
  // var garbage = table.removeChild(tableBody);
  $("#mainTable tr").remove(); 
}


/* 
  Submit AJAX get request on click
  Default behavior is to get all data
*/
function ajaxGetRequest(urlStr) {

  var url = urlStr;
  if(url == null) {
    var url = "/admin/users";
    url = $("#req-type").text();
  }

  let request = $.get(url);

  request.success(function(result) {
      generateTable(result); 
  });

  request.error(function(jqXHR, textStatus, errorThrown) {
      if (textStatus == 'timeout')
          console.log('The server is not responding');

      if (textStatus == 'error')
          console.log(errorThrown);
  });
}

/*
  @data - Tabular data
  This function generates a table based on 
  tabular data.
*/
function generateTable(data) {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.getElementById("mainTable");

  var tblBody = document.getElementById("bodyTable");
 
  // creating all cells
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
 
    for (var property in data[i]) {
      let currRow = data[i];

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

    let currid = data[i]["id"];//Get person id and pass to action buttons
    generateButton(row, currid);
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

}

/* Submit AJAX request on page load*/
$(document).ready(function() {
  ajaxGetRequest();
});