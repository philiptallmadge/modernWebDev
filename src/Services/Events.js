import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Venue with Name
// Merged the two createVenue functiosn into one
export const createEvent = (date, venueId = null, bandId = null) => {
  console.log("Creating: ", date);
  const Event = Parse.Object.extend("Events");
  const eventObject = new Event();
  eventObject.set("Date", date);

  // If VenueId is provided, create a pointer to the existing Venue
  if (venueId) {
    const VenuePointer = Parse.Object.extend("Venues");
    const venuePointer = new VenuePointer();
    venuePointer.id = venueId;  // Use the Venue ID to create the pointer
    eventObject.set("Venue", venuePointer);  // Set the venue pointer in the Event
  }

  // If BandId is provided, create a pointer to the existing Band
  if (bandId) {
    const BandPointer = Parse.Object.extend("Bands");
    const bandPointer = new BandPointer();
    bandPointer.id = bandId;  // Use the Band ID to create the pointer
    eventObject.set("Band", bandPointer);  // Set the band pointer in the Event
  }

  // Save the Event object
  return eventObject.save().then((result) => {
    console.log("Event created successfully:", result);
    return result;
  }).catch((error) => {
    console.error("Error creating event:", error);
    throw error;
  });
};


// READ operation - get Event by ID
export const getById = (id) => {
  const Event = Parse.Object.extend("Events");
  const query = new Parse.Query(Event);
  return query.get(id).then((result) => {
    // return Venue object with objectId: id
    return result;
  });
};

export let events = {};
events.collection = [];

// READ operation - get all Event in Parse class Venue
export const getAllEvents = () => {
  const Event = Parse.Object.extend("Events");
  const query = new Parse.Query(Event);
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

// DELETE operation - remove Event by ID
export const removeEvent = (id) => {
  const Event = Parse.Object.extend("Events");
  const query = new Parse.Query(Event);
  return query.get(id).then((Event) => {
    Event.destroy();
  });
};
//update operation - update Event by id
export const updateEvent = (id, band, venue) => {
    const Event = Parse.Object.extend("Events");
    const query = new Parse.Query(Event);

    return query.get(id)  // Fetch the Event object by ID
    .then((event) => {
      // Check if band is provided (not null) and update the band field if necessary
      if (band !== null) {
        const Band = Parse.Object.extend("Bands");
        const bandPointer = new Band();
        bandPointer.id = band;  // Assuming `band` is the band ID passed into the function
        event.set("Band", bandPointer);  // Update the band pointer in the Event
      }

      // Check if venue is provided (not null) and update the venue field if necessary
      if (venue !== null) {
        const Venue = Parse.Object.extend("Venues");
        const venuePointer = new Venue();
        venuePointer.id = venue;  // Assuming `venue` is the venue ID passed into the function
        event.set("Venue", venuePointer);  // Update the venue pointer in the Event
      }

      // Save the updated Event object
      return event.save();
    })
    .then((updatedEvent) => {
      console.log("Event updated successfully:", updatedEvent);
      return updatedEvent;
    })
    .catch((error) => {
      console.error("Error updating event:", error);
      throw error;
    });
};



