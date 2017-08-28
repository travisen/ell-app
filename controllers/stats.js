const pool = require('../psql/db_setup.js');
const q = require('../psql/queries'); // Import queries
const capitalizeFirstLetter = require('../utils/strings');

const stats = {};

// function checkIfExists(id) {
//   const query = {
//     text: q.doesPlaceExist,
//     values: [id]
//   };
//   pool.query(query, (err, result) => {
//     if (err) {
//       console.log(err);
//       return (`ERROR  ${err}`);
//     }

//     const doesExist = result.rows[0].exists;
//     if (doesExist) {
//       return true;
//     }
//     res.redirect(404, '/admin/places');
//   });
// }

function placeVisits(id, res) {
  const query = {
    text: q.getPlaceVisits,
    values: [id]
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.send(`ERROR  ${err}`);
    } else {
      const placeStats = result.rows;
      const name = capitalizeFirstLetter(result.rows[0].name);
      console.log(placeStats);
      res.render('admin-views/place-stats',
        {
          placeStats: placeStats,
          name: name
        });
    }
  });
}

function zeroVisits(id, res) {
  const query = {
    text: q.getNameById,
    values: [id]
  };
  pool.query(query, (err, result) => {
    if (err) {
      return (`ERROR  ${err}`);
    }

    const name = capitalizeFirstLetter(result.rows[0].name);
    res.render('admin-views/no-visits',
      {
        name: name
      });
  });
}

function getCount(id, res) {
  const query = {
    text: q.placeTotalVisits,
    values: [id]
  };
  pool.query(query, (err, result) => {
    if (err) {
      return (`ERROR  ${err}`);
    }
    console.log(result.rows[0].count);
    const count = result.rows[0].count;
    if (count > 0) {
      placeVisits(id, res);
      return;
    }
    zeroVisits(id, res);    
  });
}

stats.placeSpecific = function placeSpecific(req, res) {
  const id = req.params.id;
  const query = {
    text: q.doesPlaceExist,
    values: [id]
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return (`ERROR  ${err}`);
    }

    const doesExist = result.rows[0].exists;
    if (doesExist) {
      getCount(id, res);
      return;
    }
    res.redirect(404, '/admin/places');
    return true;
  });
};

module.exports = stats;
