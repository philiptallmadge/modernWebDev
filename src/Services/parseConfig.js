import Parse from "parse";
import { APPLICATION_ID, JAVASCRIPT_KEY, SERVER_URL } from "../environments.js";

// initialize parse
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

// setup database schema
export const setupDatabase = async () => {
  try {
    console.log("Starting database schema setup...");

    // create user class if doesnt exist
    const User = Parse.Object.extend("_User");
    const userSchema = new Parse.Schema("_User");
    
    // add fields to user class
    try {
      await userSchema.addString("userType");
      // add pointers
      await userSchema.addPointer("band_pointer", "Bands");
      await userSchema.addPointer("venue_pointer", "Venues");
      console.log("Added fields to User class");
    } catch (error) {
      console.log("User fields might already exist:", error.message);
    }

    // create band class if doesnt exist
    const Bands = Parse.Object.extend("Bands");
    const bandsSchema = new Parse.Schema("Bands");
    
    // add fields to Bands class
    try {
      await bandsSchema.addString("BandName");
      await bandsSchema.addString("Genre");
      await bandsSchema.addPointer("User", "_User"); // ptr to user
      console.log("Added fields to Bands class");
    } catch (error) {
      console.log("Bands fields might already exist:", error.message);
    }

    // create venues class if doesnt exist
    const Venues = Parse.Object.extend("Venues");
    const venuesSchema = new Parse.Schema("Venues");
    
    // add fields to venues class
    try {
      await venuesSchema.addString("Name");
      await venuesSchema.addString("Address"); // store address w/o geopoint
      await venuesSchema.addGeoPoint("Location"); // required by the schema
      await venuesSchema.addPointer("User", "_User"); // ptr to user
      console.log("Added fields to Venues class");
    } catch (error) {
      console.log("Venues fields might already exist:", error.message);
    }

    console.log("Database schema setup completed successfully");
  } catch (error) {
    console.error("Error setting up database schema:", error);
    throw error;
  }
};

setupDatabase(); 