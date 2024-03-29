import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ChatButton from './ChatButton';
import SpeechButton from "./TextToSpeech";
import EventForm from './EventForm'; // Make sure this path is correct
import "../styles/style.css";

export const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    // Placeholder for backend integration
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
          style={{border: "solid 1px #777", display: "block"}}
          width="1600" 
          height="800" 
          frameborder="0" 
          scrolling="no">
        </iframe>
      </div>
      {/* EventForm for posting new events */}
      <EventForm onAddEvent={handleAddEvent} />

      {/* Displaying posted events */}
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <a href={event.googleFormLink} target="_blank" rel="noopener noreferrer">Sign Up</a>
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
