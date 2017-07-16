'use strict';

const pool = require("../psql/db_setup.js");
const q = require("../psql/queries"); //import queries
const capitalizeFirstLetter = require("../utils/strings");

var signup = {};

signup.post = function(req, res) {
    console.log("body", req.body);
    let first = req.body.firstName.toLowerCase();
    let last = req.body.lastName.toLowerCase();
    let password = req.body.password;

    if (password != "scola12") {

        let errMsg = "Incorrect password. Place contact SCOLA";
        res.status(400).send({msg: errMsg});
        return;
    }

    let username = first + last[0] + 1;

    // const query0 = {
    //     text:q.findUsername,
    //     values: [username]
    // }

    // /* Check if username already exists */
    // pool.query(query0)
    // .then(req => {
    //     let errMsg = "";
    //     console.log(req);
    //     res.status(400).send({msg: errMsg});
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    const query = {
        text: q.addUser, //VALUES example: (travis, Nay Aug Park, 2011-2-3 )
        values: [first, last, username]
    }

    first = capitalizeFirstLetter(first);
    last = capitalizeFirstLetter(last);

    pool.query(query)
    .then(req => {

        let successMsg = "Thanks for signing up, " + first + "!";
        res.status(200).send({msg: successMsg});
    })
    .catch(error =>  {
        console.error(error.code);
        console.error(typeof(error.code));
        let errMsg = "Something went wrong, sorry. Try refreshing the page.";
        //Duplicate Person
        if(error.code === "23505") {
            errMsg = username + " already exists.";
            console.log("Duplicate Error");
            res.status(400).send({msg: errMsg});
        }    
        //All other errors
        else {
            res.status(400).send({msg: errMsg});
        }
    })
}

module.exports = signup; 