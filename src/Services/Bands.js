import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Band with Name and optional genere; there was a duplicate
// declaration of createBand which was causing some issues so I merged them
export const createBand = (Name, Genre = null) => {
  console.log("Creating: ", Name);
  const Band = Parse.Object.extend("Bands");
  const bandObject = new Band();
  bandObject.set("BandName", Name);
  if (Genre) {
    bandObject.set("Genre", Genre);
  }
  return bandObject.save().then((result) => {
    return result;
  });
};

export const getByIds = (ids) => {
  const Band = Parse.Object.extend("Bands");
  const query = new Parse.Query(Band);
  query.containedIn("objectId", ids);
  return query.find();
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

