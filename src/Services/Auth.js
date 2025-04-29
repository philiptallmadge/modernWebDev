import Parse from "parse";

// register new user with their type
export const registerUser = async (username, password, email, userType, additionalInfo) => {
  try {
    console.log("Starting registration process...");
    console.log("User type:", userType);
    console.log("Additional info:", additionalInfo);

    // create a new user in Parse
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("userType", userType); // either band or venue

    // sign up user
    console.log("Creating user account...");
    const userResult = await user.signUp();
    console.log("User created successfully:", userResult);

    // create the corresponding Band/Venue object based on userType
    if (userType === 'band') {
      console.log("Creating band object...");
      const Band = Parse.Object.extend("Bands");
      const bandObject = new Band();
      bandObject.set("BandName", additionalInfo.name);
      bandObject.set("Genre", additionalInfo.genre);
      bandObject.set("User", userResult); // linj band to user
      const savedBand = await bandObject.save();
      console.log("Band created successfully:", savedBand);

      // Link user to band 
      userResult.set("band_pointer", savedBand);
      await userResult.save();
      console.log("User linked to band successfully");
    } else if (userType === 'venue') {
      console.log("Creating venue object...");
      const Venue = Parse.Object.extend("Venues");
      const venueObject = new Venue();
      venueObject.set("Name", additionalInfo.name);
      
      // Store the address as a string
      venueObject.set("Address", additionalInfo.location);
      
      // Ccreate geopoint for location and set it to 0,0 for now
      const location = new Parse.GeoPoint(0, 0);
      venueObject.set("Location", location);
      
      venueObject.set("GenrePreferred", additionalInfo.genrePreferred);
      venueObject.set("User", userResult); // link venue to user
      const savedVenue = await venueObject.save();
      console.log("Venue created successfully:", savedVenue);

      // link user to venue
      userResult.set("venue_pointer", savedVenue);
      await userResult.save();
      console.log("User linked to venue successfully");
    }

    return userResult;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// login da user
export const loginUser = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// get current user
export const getCurrentUser = () => {
  return Parse.User.current();
};

// logout user
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}; 