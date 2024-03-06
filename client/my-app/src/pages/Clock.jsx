import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import "../styles/clock.css";
import Header from "./Header";
import Footer from "./Footer";

export const Clock = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Replace 'yourAuthTokenHere' with the actual token, usually stored in local storage or context
        const { data } = await axios.get('http://localhost:3001/api/auth/getuser', {
          headers: {
            Authorization: `Bearer yourAuthTokenHere`
          }
        });
        setFullName(data.fullname);
        setUserEmail(data.email);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const timeOptions = Array.from({ length: 48 }).map((_, index) => {
    const time = moment().startOf('day').add(30 * index, 'minutes');
    return time.format('HH:mm');
  });

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const duration = moment.duration(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm")));
    return duration.asHours();
  };

  const logHours = async () => {
    const hoursData = {
      email: userEmail,
      selectedDate: moment(selectedDate).format("YYYY-MM-DD"),
      fullname: fullName,
      startTime,
      endTime,
      hoursWorked: calculateHours()
    };

    try {
      await axios.post('http://localhost:3001/api/auth/timesheet', hoursData, {
        headers: {
          Authorization: `Bearer yourAuthTokenHere`
        }
      });
      alert('Hours logged successfully');
    } catch (error) {
      console.error('Error logging hours:', error);
      alert('Failed to log hours');
    }
  };

  return (
    <div className="clock-in-clock-out">
      <Footer />
      <div className="manage-newsletters">
        <div className="text-wrapper-6">Welcome {fullName}</div>
        <div className="element-4">
          <div className="text-wrapper-8">Selected Date</div>
          <DatePicker 
            selected={selectedDate} 
            onChange={date => setSelectedDate(date)} 
            dateFormat="MMMM d, yyyy" 
          />
        </div>
        <div className="element-5">
          <div className="text-wrapper-8">Full Name</div>
          <div className="div-wrapper">
            <div className="text-wrapper-9">{fullName}</div>
          </div>
        </div>
        <div className="element-6">
          <div className="text-wrapper-8">Time Worked</div>
          <div className="div-wrapper">
            <div className="text-wrapper-9">{calculateHours()} hours</div>
          </div>
        </div>
        <div className="element-7">
          <div className="text-wrapper-8">End Time</div>
          <select value={endTime} onChange={e => setEndTime(e.target.value)}>
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="element-8">
          <div className="text-wrapper-8">Start Time</div>
          <select value={startTime} onChange={e => setStartTime(e.target.value)}>
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <button className="button-2" onClick={logHours}>
          <div className="text-wrapper-10">Log Hours</div>
        </button>
      </div>
      <Header />
    </div>
  );
};
