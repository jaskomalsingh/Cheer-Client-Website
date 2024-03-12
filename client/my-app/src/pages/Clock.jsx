


import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import Header from "./Header"; // Make sure the path matches your project structure
import Footer from "./Footer"; // Make sure the path matches your project structure
import "../styles/style.css"; // Adjust the path as necessary
import Container from 'react-bootstrap/Container';

export const Clock = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");
    return end.diff(start, 'hours', true); // true for a floating-point result
  };

  const logHours = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/timesheet', {
        email: userEmail,
        selectedDate: moment(selectedDate).format("YYYY-MM-DD"),
        fullname: fullName,
        startTime,
        endTime,
        hoursWorked: calculateHours()
      });
      alert('Hours logged successfully');
    } catch (error) {
      console.error('Error logging hours:', error);
      alert('Failed to log hours');
    }
  };

  const timeOptions = Array.from({ length: 48 }).map((_, index) => (
    moment().startOf('day').add(30 * index, 'minutes').format('HH:mm')
  ));

  return (
    <Container fluid>
      <Header />
      <div className="sign-up">
        <div className="div">
          <div className="sign-up-form">
            <div className="form-title">
              <h2>Log Hours</h2>
              <p className="bio">Enter your details and log your hours.</p>
            </div>
            <div className="sign-up-form-content">
              <div className="form-wrapper">
                <div className="element-wrapper">
                  <label htmlFor="email" className="input-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="element-wrapper">
                  <label htmlFor="fullName" className="input-label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="form-wrapper">
                <div className="element-wrapper">
                  <label htmlFor="selectedDate" className="input-label">Selected Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>
              <div className="form-wrapper">
                <div className="element-wrapper">
                  <label htmlFor="startTime" className="input-label">Start Time</label>
                  <select value={startTime} onChange={e => setStartTime(e.target.value)} id="startTime">
                    {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
                <div className="element-wrapper">
                  <label htmlFor="endTime" className="input-label">End Time</label>
                  <select value={endTime} onChange={e => setEndTime(e.target.value)} id="endTime">
                    {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
              <button type="button" className="button" onClick={logHours}>
                Log Hours
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </Container>
  );
};

export default Clock;
