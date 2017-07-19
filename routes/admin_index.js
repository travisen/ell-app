var express       = require("express");
    admin         = require("../controllers/admin")
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

//router.get("/admin", admin.landing);

router.get("/admin/places", admin.places);

router.post("/admin/places/add", urlencodedParser, admin.addPlace)

router.get("/admin/people", admin.people);

//Api Route
router.get("/admin/places/:type", admin.allPlaces);

router.get("/admin/users/", admin.allPeople);

//Api Route
router.post("/admin/users/add", urlencodedParser, admin.addUser)

//Api Route
router.post("/admin/people/:id/delete", admin.destroyUser);

//Api Route
router.get("/admin/visits/:type", admin.getVisits)

router.get("/admin/visits", admin.visits);

module.exports = router;
