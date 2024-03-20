import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import "../styles/style.css";
import SpeechButton from "./TextToSpeech";

export const Calendar = () => {
  // Inline style for the calendar container
  const calendarStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '150px', // Top padding of 300px
  };

  return (
    <div className="calendar-page">
      <Header />
      <div style={calendarStyle}>
        <iframe 
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&bgcolor=%237CB342&src=b25nb2luZ2xpdmluZ2xlYXJuaW5naW5jQGdtYWlsLmNvbQ&src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043" 
          style={{border: "solid 1px #777", display: "block"}} // Ensuring the iframe is displayed as a block element for centering
          width="1600" 
          height="800" 
          frameborder="0" 
          scrolling="no"></iframe>
      </div>
      <SpeechButton/>
      <Footer />
      
    </div>
  );
};

export default Calendar;
