const pool = require('../psql/db_setup.js');
const q = require('../psql/queries'); // import queries
const capitalizeFirstLetter = require('../utils/strings');

const visit = {};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;

  return today;
}

visit.getForm = function getForm(req, res) {
  let place = '';

  if (req.query.place != null) {
    console.log(req.query.place);
    place = req.query.place;
  }

  if (req.query.date != null) {
    console.log(req.query.date);
    const date = req.query.date;
  }

  // If name is sent through url 
  if (place.length > 1) {
    let date = getCurrentDate();
    res.render('add-visit-non-datalist', { place: place, currentDate: date });
    return;
  }

  function render(err, result) {
    if (err) {
      console.error(err);
      res.send('ERROR' + err);
    } else {
      const currentDate = getCurrentDate();
      const placeList = result.rows;
      const isVis = 'not-visible';
      const errMsg = '';

      console.log(currentDate);
      console.log(placeList);
      res.render("add-visit", {
        placeList: placeList,
        place: place,
        currentDate: currentDate,
        isVis: isVis,
        errMsg: errMsg
      });
    }
  }
  console.log(q.getNames);
  pool.query(q.getNames, render);
};

// This function works but is not robust.
// Need to figure out how to handle username
visit.post = function post(req, res) {
  console.log('body: ', req.body);

  let first = req.body.firstName.toLowerCase();
  let last = req.body.lastName.toLowerCase();
  let place = req.body.place.toLowerCase();
  const date = req.body.date;

  const query = {
    text: q.insertVisit,
    values: [first, last, place, date]
  };

  first = capitalizeFirstLetter(first);
  last = capitalizeFirstLetter(last);

  pool.query(query)
    .then(() => {
      place = toTitleCase(place);
      const successMsg = `${first} thanks for adding your visit to ${place} on ${date}!`;
      console.log(successMsg);
      res.status(200).send({ msg: successMsg });
    })
    .catch((error) => {
      const isVis = 'visible';

      console.error(error);
      console.error(error.code);

      let errMsg = 'Something went wrong, sorry. Try refreshing the page.';

      // Duplicate Visit
      if (error.code === '23505') {
        place = toTitleCase(place);
        errMsg = `Sorry, ${first}. But you've already visited ${place} on ${date}.`;

        console.log('Duplicate Error');
        res.status(400).send({ msg: errMsg });
      }

      // Name or place does not exist
      else if (error.code === '23502') {
        errMsg = `Sorry, but ${first} ${last} is not a current user.`;

        console.log('Name Error');
        res.status(400).send({ msg: errMsg });
      }
      // All other errors
      else {
        res.status(400).send({ msg: errMsg });
      }
    });
};

module.exports = visit;

