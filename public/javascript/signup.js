$(document).ready(function() {
    console.log("Jquery Connected!");
});


/* attach a submit handler to the form */
$("#signupForm").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get some values from elements on the page: */
    let $form = $(this),
        firstName = $form.find('input[name="firstName"]').val(),
        lastName = $form.find('input[name="lastName"]').val(),
        password = $form.find('input[name="password"]').val(),
        url = $form.attr('action')

    /*Check if passwords match here */    

    /* Send the data using post */
    let posting = $.post(url, {
        firstName: firstName,
        lastName: lastName,
        password: password
    });

    /* Put the results in a div */
    posting.done(function(data){
        var content = data.msg;
        $("#serverMessage").removeClass("alert alert-danger");
        $("#serverMessage").addClass("alert alert-success");
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();
    });

    /*Error*/
    posting.fail(function(data) {
        var content = data.responseJSON.msg;
        console.log($("#serverMessage").attr("class"));
        if ($("#serverMessage").attr("class") == "alert alert-success"){
            $("#serverMessage").removeClass("alert alert-success");
            $("#serverMessage").addClass("alert alert-danger");
        }
        $("#serverMessage").empty().append(content);
        $("#serverMessage").show();
    });
});