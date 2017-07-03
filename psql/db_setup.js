var pg = require("pg");

//Setup DB pool
const Pool        = require("pg-pool"),
      url         = require("url"),
      params	  = url.parse(process.env.DATABASE_URL),
      auth 		  = params.auth.split(":");

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  ssl: true
};

const pool = new Pool(config);

//Export query method
module.exports.query = (text, values) => {
  // console.log('query:', text, values)
  return pool.query(text, values);
}