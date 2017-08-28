const pool = require('../psql/db_setup.js');
const q = require('../psql/queries');

const landing = {};

const d = new Date();
const month = [];

month[0] = 'Out of Range';
month[1] = 'January';
month[2] = 'February';
month[3] = 'March';
month[4] = 'April';
month[5] = 'May';
month[6] = 'June';
month[7] = 'July';
month[8] = 'August';
month[9] = 'September';
month[10] = 'October';
month[11] = 'November';
month[12] = 'December';

// Find out which is more preferable
// landing.get = function get(req, res) {
//   const monthNumber = d.getMonth() + 1;
//   const header = month[monthNumber];

//   const query = {
//     text: q.top3Leaders,
//     values: [monthNumber]
//   };

//   console.log(query.values);
//   pool.query(query, render);

//   function render(err, result) {
//     if (err) {
//       console.error(err);
//       res.send(`ERROR ${err}`);
//     } else {
//       const leaders = result.rows;
//       console.log(leaders);
//       res.render('landing', { header, leaders });
//     }
//   }
// };
landing.get = function get(req, res) {
  const monthNumber = d.getMonth() + 1;
  const header = month[monthNumber];

  const query = {
    text: q.top3Leaders,
    values: [monthNumber]
  };

  console.log(query.values);

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.send(`ERROR ${err}`);
    } else {
      const leaders = result.rows;
      console.log(leaders);
      res.render('landing', { header, leaders });
    }
  });
};

module.exports = landing;
