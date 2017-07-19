var express       = require("express");
    admin         = require("../controllers/admin")
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

router.get("/admin", admin.landing);

router.get("/admin-places", admin.places);

router.get("/admin-people", admin.people);

router.get("/admin/places/:type", admin.allPlaces);

router.get("/admin/users/", admin.allPeople);

router.post("/admin-people/:id/delete", admin.destroyUser);

module.exports = router;
