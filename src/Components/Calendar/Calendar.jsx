import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // for basic styling
import { getAllEvents, createEvent, updateEvent} from "../../Services/Events.js"; 
import {getById} from "../../Services/Bands.js";
import { getByIds as getBandsByIds } from "../../Services/Bands.js";
import { getByIds as getVenuesByIds } from "../../Services/Venues.js";
import { checkUser } from "../Auth/AuthService.jsx"

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("12:00");
    const [bandId, setBandId] = useState("");
    const [venueId, setVenueId] = useState("");
    const [bands, setBands] = useState({});
    const [venues, setVenues] = useState({});
    const [userAuthenticated, setUserAuthenticated] = useState(false);
  // Fetch events from backend
  useEffect(() => {
    const fetchEventsAndRelatedData = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
        setUserAuthenticated(checkUser());
        // Extract unique Band and Venue IDs
        const bandIds = [...new Set(fetchedEvents.map((event) => event.get("Band")?.id))];
        const venueIds = [...new Set(fetchedEvents.map((event) => event.get("Venue")?.id))];

        // Fetch Bands and Venues in batches
        const [bandsData, venuesData] = await Promise.all([
          getBandsByIds(bandIds),
          getVenuesByIds(venueIds)
        ]);

        // Build ID -> object maps
        const bandMap = bandsData.reduce((acc, band) => {
          acc[band.id] = band;
          return acc;
        }, {});

        const venueMap = venuesData.reduce((acc, venue) => {
          acc[venue.id] = venue;
          return acc;
        }, {});

        setBands(bandMap);
        setVenues(venueMap);
      } catch (error) {
        console.error("Error fetching events or related data:", error);
      }
    };

    fetchEventsAndRelatedData();
  }, []);

  // Helper function to format events into an array of dates
  const getEventDates = () => {
    return events.map((event) => {
      const eventDate = new Date(event.get("Date")); // Assume `Date` field is a Date object
      return eventDate.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
    });
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date when user clicks on a day
  };

  const combineDateAndTime = (date, time) => {
    const [hours, minutes] = time.split(":");
    // Set the hours and minutes from the selected time
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0); // Set time to selected hours and minutes
    return combinedDate;
  };
  const handleCreateEvent = () => {
    const dateAndTime = combineDateAndTime(selectedDate, selectedTime);
    if (!venueId) {
      alert("Please provide  a Band or a Venue.");
      return;
    }
    

    // Call the createEvent service to create a new event
    createEvent(dateAndTime, venueId, bandId)
      .then((result) => {
        console.log("Event created successfully:", result);
        alert("Event created successfully!");
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Failed to create event.");
      });
  };
  const handleJoinEvent = async (eventId) => {
    if (!userAuthenticated) {
      alert("You must be logged in to join an event.");
      return;
    }
    if (!currentUser?.band?.id) {
      alert("You must have a band to join.");
      return;
    }

    try {
      await updateEvent(eventId, currentUser.band.id, null); // new: use updateEvent instead of modifyEvent
      alert("Successfully joined the event!");
      const updatedEvents = await getAllEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join event.");
    }
  };
  const eventDates = getEventDates(); // Get all event dates
  const showCreateEventButton = venueId && userAuthenticated && hasValidUserVenue;
  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Calendar</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactCalendar
          onChange={handleDateChange} // Set the selected date
          value={selectedDate} // Display the selected date
          tileClassName={({ date, view }) => {
            // Check if this tile date has an event and add a class for styling
            const dateString = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
            if (eventDates.includes(dateString)) {
              return "highlight-event"; // Return a custom class for dates with events
            }
            return "";
          }}
        />
      </div>
      {showCreateEventButton && (
      <div style={{ marginTop: "20px" }}>
        <label>
          Time:
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange} // Update time on change
          />
        </label>
      </div>
      )}
      {/* Button to create the event */}
      {showCreateEventButton && ( // new: Only show the Create Event button if all conditions are met
        <button
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
          onClick={handleCreateEvent}
        >
          Create Event
        </button>
      )}
      <div>
        <h2>Events on {selectedDate.toLocaleDateString()}</h2>
        <ul className="event-list">
        {events
          .filter((event) => {
            const eventDate = new Date(event.get("Date"));
            return eventDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
          })
          .map((event, index) => {
            const bandObj = event.get("Band");
            const venueObj = event.get("Venue");
            const band = bands[bandObj?.id];
            const venue = venues[venueObj?.id];
            
            const bandName = band ? band.get("BandName") : "No band yet, still available";
            const bandGenre = band ? band.get("Genre") : "";
            const venueName = venue ? venue.get("Name") : "No band yet, still available";
            const eventTime = new Date(event.get("Date")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
            return (
              <li key={index} className="event-card">
                <h3 className="band-name">{bandName}</h3>
                {bandGenre && (
                  <p className="band-genre">{bandGenre}</p>
                )}
                <p className="venue-name">🎵 Venue: {venueName}</p>
                <p className="event-time">🕒 Time: {eventTime}</p>
                {!band  && userAuthenticated && currentUser?.band?.id ( 
                    <button onClick={() => handleJoinEvent(event.id)}>
                      Join This Slot
                    </button>
                  )}
              </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
