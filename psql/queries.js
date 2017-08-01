const q = {};

q.allPlaces = `SELECT id, name, street_address, city, state, zipcode, description, cost
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

q.addPlace = `INSERT INTO place(name, place_type, street_address, city, zipcode, description, phone, cost)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`     

q.findUsername = `SELECT username FROM person WHERE username = ($1);`

q.usersLastNameAtoZ = `SELECT id, first_name, last_name, username FROM person ORDER BY last_name ASC;`

q.usersLastNameZtoA = `SELECT id, first_name, last_name, username FROM person ORDER BY last_name DESC;`

q.usersfirstNameAtoZ = `SELECT id, first_name, last_name, username FROM person ORDER BY first_name ASC;`

q.usersfirstNameZtoA = `SELECT id, first_name, last_name, username FROM person ORDER BY first_name DESC;`

q.destroyUser = `DELETE FROM person WHERE id = ($1);`

q.destroyPlace = `DELETE FROM place WHERE id = ($1);`

q.destroyVisit = `DELETE FROM person_visit WHERE id = ($1);`

q.getVisitsMostRecent = `SELECT person_visit.id, person.first_name, person.last_name, place.name , person_visit.visited_on
FROM person_visit INNER JOIN
person ON person_visit.person_id = person.id INNER JOIN
place ON person_visit.place_id = place.id
ORDER BY person_visit.visited_on DESC;`

q.totalVisits =`SELECT COUNT (*) from person_visit;`

q.visits7 = `SELECT COUNT (*) from person_visit WHERE visited_on > current_date - interval '7 days';`

q.visits30 = `SELECT COUNT (*) from person_visit WHERE visited_on > current_date - interval '30 days';`

q.visits365 = `SELECT COUNT (*) from person_visit WHERE visited_on > current_date - interval '365 days';`

q.userVisitsMonth = `SELECT COUNT (*) from person_visit WHERE EXTRACT(MONTH FROM person_visit.visited_on)
 = EXTRACT(MONTH FROM current_date) AND person_id = ($1);`

q.userTotalVisits = `SELECT COUNT (*) from person_visit WHERE person_id = ($1);`

q.placeVisitsMonth = `SELECT COUNT (*) from person_visit WHERE EXTRACT(MONTH FROM person_visit.visited_on)
 = EXTRACT(MONTH FROM current_date) AND place_id = ($1);`

q.placeTotalVisits = `SELECT COUNT (*) from person_visit WHERE place_id = ($1);`

q.mostVisitedPlacesMonth = `SELECT place.id, place.name, COUNT(person_visit.place_id) AS visits
	   FROM place LEFT JOIN person_visit ON place.id = person_visit.place_id
	    AND EXTRACT(MONTH FROM person_visit.visited_on) = EXTRACT(MONTH FROM current_date)
	     GROUP BY place.id
	      ORDER BY visits DESC;`

q.mostVisitedPlaces = `SELECT place.id, place.name, COUNT(person_visit.place_id) AS visits
	   FROM place LEFT JOIN person_visit ON place.id = person_visit.place_id
	     GROUP BY place.id
	      ORDER BY visits DESC;`

q.getAdmin = `SELECT username, password FROM auth
WHERE username, password = ($1, $2);`

q.getAdmin2 = `SELECT * FROM auth WHERE username = ($1);`

q.checkAdmin = `SELECT username FROM auth WHERE username
 FROM place
  WHERE id = ($1);`

q.updatePhone = `UPDATE place SET phone = ($1) WHERE id = ($2);`


module.exports = q;