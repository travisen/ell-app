var express       = require("express");
    admin         = require("../controllers/admin")
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

module.exports = router;

router.get("/", admin.landing);
