import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Venue with Name
export const createVenue = (Name) => {
  console.log("Creating: ", Name);
  const Venue = Parse.Object.extend("Venues");
  const Venue = new Venue();
  // using setter to UPDATE the object
  Venue.set("Name", Name);
  return Venue.save().then((result) => {
    // returns new Venue object
    return result;
  });
};
// Create Operation - new Venue with Name and Genre
export const createVenue = (Name, Genre) => {
    console.log("Creating: ", Name);
    const Venue = Parse.Object.extend("Venues");
    const Venue = new Venue();
    // using setter to UPDATE the object
    Venue.set("VenueName", Name);
    Venue.set("Genre", Genre);
    return Venue.save().then((result) => {
      // returns new Venue object
      return result;
    });
  };

// READ operation - get Venue by ID
export const getById = (id) => {
  const Venue = Parse.Object.extend("Venues");
  const query = new Parse.Query(Venue);
  return query.get(id).then((result) => {
    // return Venue object with objectId: id
    return result;
  });
};

export let Venues = {};
Venues.collection = [];

// READ operation - get all Venues in Parse class Venue
export const getAllVenues = () => {
  const Venue = Parse.Object.extend("Venues");
  const query = new Parse.Query(Venue);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Venue objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// DELETE operation - remove Venue by ID
export const removeVenue = (id) => {
  const Venue = Parse.Object.extend("Venues");
  const query = new Parse.Query(Venue);
  return query.get(id).then((Venue) => {
    Venue.destroy();
  });
};

