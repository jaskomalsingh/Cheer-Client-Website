import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ChatButton from './ChatButton';
import SpeechButton from "./TextToSpeech";
import EventForm from './EventForm'; // Make sure this path is correct
import "../styles/style.css";

export const Calendar = () => {
  const role = localStorage.getItem('role'); // Get role from localStorage
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Function to fetch events from the server
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        if (response.ok) {
          const fetchedEvents = await response.json();
          setEvents(fetchedEvents); // Update state with fetched events
        } else {
          console.error('Failed to fetch events:', response.status);
          // Handle server errors or invalid responses
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle errors in sending request to the server
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []); 

  const handleAddEvent = async (newEvent) => {
    console.log('New event:', newEvent);
    if (!/^https?:\/\//i.test(newEvent.googleFormLink)) {
      newEvent.googleFormLink = 'http://' + newEvent.googleFormLink;
    }
  
    try {
      console.log('Posting new event:', newEvent);
      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Posting new event:', newEvent);
        alert(result.message); // Or any other notification mechanism
        setEvents([...events, newEvent]); // Optionally update UI upon successful save
      } else {
        console.error('Failed to submit event:', response.status);
        // Handle server errors or invalid responses
        const errorResult = await response.json();
        alert(errorResult.message);
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      // Handle errors in sending request to server
    }
  };  

  const calendarStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '150px',
  };

  return (
    <div className="calendar-page">
      <Header />
      <div style={calendarStyle}>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&bgcolor=%237CB342&src=b25nb2luZ2xpdmluZ2xlYXJuaW5naW5jQGdtYWlsLmNvbQ&src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043"
          style={{ border: "solid 1px #777", display: "block" }}
          width="1600"
          height="800"
          frameborder="0"
          scrolling="no">
        </iframe>
      </div>
      {/* Conditional rendering based on role */}
      {role === 'admin' && <EventForm onEventSubmit={handleAddEvent} />}
      {/* Displaying posted events */}
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <button
              className="event-signup-button"
              onClick={() => window.open(event.googleFormLink, '_blank', 'noopener,noreferrer')}
            >
              Sign Up
            </button>

          </div>
        ))}
      </div>
      <SpeechButton />
      <ChatButton />
      <Footer />
    </div>
  );

};

export default Calendar;
