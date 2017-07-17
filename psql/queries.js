const q = {};

q.allPlaces = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place;`

q.play = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place
  WHERE place_type = 'play';`;

q.eat = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place
  WHERE place_type = 'eat';`;

q.shop = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place
  WHERE place_type = 'shop';`;

q.other = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place
  WHERE place_type = 'other';`;

q.getById = `SELECT id, name, description, street_address, city, state, zipcode, cost
 FROM place
  WHERE id = ($1)`;

q.leaders = `SELECT person.id, person.first_name, COUNT(person_visit.person_id) AS visits
	   FROM person LEFT JOIN person_visit ON person.id = person_visit.person_id
	    AND EXTRACT(MONTH FROM person_visit.visited_on) = $1
	     GROUP BY person.id HAVING COUNT(person_visit.person_id) > 0
	      ORDER BY visits DESC;`;

q.top3Leaders = `SELECT person.id, person.first_name, COUNT(person_visit.person_id) AS visits
	   FROM person LEFT JOIN person_visit ON person.id = person_visit.person_id
	    AND EXTRACT(MONTH FROM person_visit.visited_on) = ($1)
	     GROUP BY person.id HAVING COUNT(person_visit.person_id) > 0
	      ORDER BY visits DESC LIMIT 3;`;

q.getNames = `SELECT id, name FROM place;`;

q.insertVisit = `INSERT INTO person_visit(
    person_id, place_id, visited_on)
    VALUES(
        (SELECT id from person where first_name=$1),
        (SELECT id from place where name=$2),
        $3);`

q.addUser = `INSERT INTO person (first_name, last_name, username)
  VALUES ($1, $2, $3);`        

q.findUsername = `SELECT username FROM person WHERE username = ($1);`

q.usersLastNameAtoZ = `SELECT id, first_name, last_name, username FROM person ORDER BY last_name ASC;`

q.usersLastNameZtoA = `SELECT id, first_name, last_name, username FROM person ORDER BY last_name DESC;`

q.usersfirstNameAtoZ = `SELECT id, first_name, last_name, username FROM person ORDER BY first_name ASC;`

q.usersfirstNameZtoA = `SELECT id, first_name, last_name, username FROM person ORDER BY first_name DESC;`

module.exports = q;