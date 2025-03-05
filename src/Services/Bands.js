import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Band with Name
export const createBand = (Name) => {
  console.log("Creating: ", Name);
  const Band = Parse.Object.extend("Bands");
  const Band = new Band();
  // using setter to UPDATE the object
  Band.set("Name", Name);
  return Band.save().then((result) => {
    // returns new Band object
    return result;
  });
};
// Create Operation - new Band with Name and Genre
export const createBand = (Name, Genre) => {
    console.log("Creating: ", Name);
    const Band = Parse.Object.extend("Bands");
    const Band = new Band();
    // using setter to UPDATE the object
    Band.set("BandName", Name);
    Band.set("Genre", Genre);
    return Band.save().then((result) => {
      // returns new Band object
      return result;
    });
  };

// READ operation - get Band by ID
export const getById = (id) => {
  const Band = Parse.Object.extend("Bands");
  const query = new Parse.Query(Band);
  return query.get(id).then((result) => {
    // return Band object with objectId: id
    return result;
  });
};

export let Bands = {};
Bands.collection = [];

// READ operation - get all Bands in Parse class Band
export const getAllBands = () => {
  const Band = Parse.Object.extend("Bands");
  const query = new Parse.Query(Band);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Band objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
//Update operation - edit band by ID

// DELETE operation - remove Band by ID
export const removeBand = (id) => {
  const Band = Parse.Object.extend("Bands");
  const query = new Parse.Query(Band);
  return query.get(id).then((Band) => {
    Band.destroy();
  });
};

