import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Band with Name and optional genere; there was a duplicate
// declaration of createBand which was causing some issues so I merged them
export const createBand = async (Name, Genre = null) => {
  try {
    console.log("Creating band:", { Name, Genre });
    const Band = Parse.Object.extend("Bands");
    const bandObject = new Band();
    bandObject.set("BandName", Name);
    if (Genre) {
      bandObject.set("Genre", Genre);
    }
    const result = await bandObject.save();
    console.log("Band created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in createBand:", error);
    throw error;
  }
};

export const getByIds = async (ids) => {
  try {
    console.log("Fetching bands by IDs:", ids);
    const Band = Parse.Object.extend("Bands");
    const query = new Parse.Query(Band);
    query.containedIn("objectId", ids);
    query.include("User"); // Include the related User object
    const results = await query.find();
    console.log("Successfully fetched bands:", results);
    return results;
  } catch (error) {
    console.error("Error in getByIds:", error);
    throw error;
  }
};
// READ operation - get Band by ID
export const getById = async (id) => {
  try {
    console.log("Fetching band by ID:", id);
    const Band = Parse.Object.extend("Bands");
    const query = new Parse.Query(Band);
    query.include("User"); // include the related User object
    const result = await query.get(id);
    console.log("Successfully fetched band:", result);
    return result;
  } catch (error) {
    console.error("Error in getById:", error);
    throw error;
  }
};

export let Bands = {};
Bands.collection = [];

// READ operation - get all Bands in Parse class Band
export const getAllBands = async () => {
  try {
    console.log("Fetching all bands...");
    const Band = Parse.Object.extend("Bands");
    const query = new Parse.Query(Band);
    query.include("User"); 
    const results = await query.find();
    console.log("Successfully fetched bands:", results);
    return results;
  } catch (error) {
    console.error("Error in getAllBands:", error);
    throw error;
  }
};
//Update operation - edit band by ID

// DELETE operation - remove Band by ID
export const removeBand = async (id) => {
  try {
    console.log("Removing band by ID:", id);
    const Band = Parse.Object.extend("Bands");
    const query = new Parse.Query(Band);
    const band = await query.get(id);
    await band.destroy();
    console.log("Band removed successfully");
  } catch (error) {
    console.error("Error in removeBand:", error);
    throw error;
  }
};

