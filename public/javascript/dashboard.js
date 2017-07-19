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
  if(type === "people"){
    button.onclick = function() {deleteUser(id)}; //Assign function to button
  }
  else if (type === "places"){
    button.onclick = function() {deletePlace(id)};
  }
  else if (type === "visits"){
    button.onclick = function() {deleteVisit(id)};
  }

  //button.setAttribute("class", "btn btn-info btn-sm");
  cell.appendChild(button);
  row.appendChild(cell);
}

function deleteVisit(id){
  console.log(id);
  //admin-people/30/delete
  let urlType = "/admin/visits/";
  let urlAction = "/delete";

  let url = urlType + id + urlAction;
  console.log(url);
  ajaxPostRequest(url);
  removeTable();
  ajaxGetRequest();
}

function deletePlace(id){
  console.log(id);
  //admin-people/30/delete
  let urlType = "/admin/place/";
  let urlAction = "/delete";

  let url = urlType + id + urlAction;
  console.log(url);
  ajaxPostRequest(url);
  removeTable();
  ajaxGetRequest();
}

function deleteUser(id){
  console.log(id);
  //admin-people/30/delete
  let urlType = "/admin/people/";
  let urlAction = "/delete";

  let url = urlType + id + urlAction;
  console.log(url);
  ajaxPostRequest(url);
  removeTable();
  ajaxGetRequest();
}

/* Submit AJAX post request on click */
function ajaxPostRequest(urlStr) {

  event.preventDefault();

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

  event.preventDefault();

  var url = urlStr;
  if(url == null) {
    var url = "/admin/users";
    url = $("#req-path").text();
  }

  let request = $.get(url);
  request.success(function(result) {
      console.log(result);

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
    
    let pageType = document.getElementById("req-type").textContent;
    
    generateButton(row, currid, pageType);

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

}

$("#addPerson").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get some values from elements on the page: */
    let $form = $(this),
        first_name = $form.find('input[name="first_name"]').val(),
        last_name = $form.find('input[name="last_name"]').val(),
        password = $form.find('input[name="password"]').val(),
        url = $form.attr('action')

    /* Send the data using post */
    let posting = $.post(url, {
      firstName : first_name,
      lastName : last_name,
      password : password
    });

    /* Put the results in a div */
    posting.done(function(data){
        var content = data.msg;
        $("#serverMessage").removeClass("alert alert-danger");
        $("#serverMessage").addClass("alert alert-success");
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();

        removeTable();
        ajaxGetRequest("/admin/users");
    });

    /*Error*/
    posting.fail(function(data) {
        console.log(data);
        var content = data.responseJSON.msg;
        console.log($("#serverMessage").attr("class"));
        if ($("#serverMessage").attr("class") == "alert alert-success"){
            $("#serverMessage").removeClass("alert alert-success");
            $("#serverMessage").addClass("alert alert-danger");
        }
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();
    });
    resetFields();
});

/* Attach a submit handler to the form */
$("#placeAddForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get some values from elements on the page: */
    let $form = $(this),
        name = $form.find('input[name="name"]').val(),
        place_type = $form.find('select[name="place_type"]').val(),
        street_address = $form.find('input[name="street"]').val(),
        city = $form.find('input[name="city"]').val(),
        zipcode = $form.find('input[name="zipcode"]').val(),
        description = $form.find('textarea[name="description"]').val(),
        phone = $form.find('input[name="phone"]').val(),
        cost = $form.find('select[name="cost"]').val(),
        url = $form.attr('action')

    /* Send the data using post */
    let posting = $.post(url, {
      name : name,
      place_type : place_type,
      street_address : street_address,
      city : city,
      zipcode : zipcode,
      description : description,
      phone : phone,
      cost : cost,
      url : url
    });

    /* Put the results in a div */
    posting.done(function(data){
        var content = data.msg;
        $("#serverMessage").removeClass("alert alert-danger");
        $("#serverMessage").addClass("alert alert-success");
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();

        removeTable();
        ajaxGetRequest("/admin/places/all");
    });

    /*Error*/
    posting.fail(function(data) {
        console.log(data);
        var content = data.responseJSON.msg;
        console.log($("#serverMessage").attr("class"));
        if ($("#serverMessage").attr("class") == "alert alert-success"){
            $("#serverMessage").removeClass("alert alert-success");
            $("#serverMessage").addClass("alert alert-danger");
        }
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();
    });
    resetFields();
});

function resetFields(){
  var elements = document.getElementsByTagName("input");
  for (var ii=0; ii < elements.length; ii++) {
    if (elements[ii].type == "text") {
      elements[ii].value = "";
    }
  }
}

/* Submit AJAX request on page load*/
$(document).ready(function() {
  ajaxGetRequest();
});