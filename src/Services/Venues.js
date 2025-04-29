import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Venue with Name
// Merged the two createVenue functiosn into one
export const createVenue = (Name, Genre = null) => {
  console.log("Creating: ", Name);
  const Venue = Parse.Object.extend("Venues");
  const venueObject = new Venue();
  venueObject.set("VenueName", Name);
  if (Genre) {
    venueObject.set("Genre", Genre);
  }
  return venueObject.save().then((result) => {
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

export const getByIds = (ids) => {
  const Venue = Parse.Object.extend("Venues");
  const query = new Parse.Query(Venue);
  query.containedIn("objectId", ids);
  return query.find();
};