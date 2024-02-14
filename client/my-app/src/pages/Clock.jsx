import React from "react";
import "../styles/clock.css";
import Header from "./Header";
import Footer from "./Footer";

export const Clock = () => {

  return (
    <div className="clock-in-clock-out">
      <div className="div">
      <Footer height="1501px"/>
          <div className="manage-newsletters">
            <div className="text-wrapper-6">Welcome Employee name</div>
            <img className="group" alt="Group" src="group-1.png" />
            <div className="text-wrapper-7">Select Date</div>
            <div className="element-4">
              <div className="text-wrapper-8">Selected Date</div>
              <div className="div-wrapper">
                <div className="text-wrapper-9">March 2, 2023</div>
              </div>
            </div>
            <div className="element-5">
              <div className="text-wrapper-8">Full Name</div>
              <div className="div-wrapper">
                <div className="text-wrapper-9">John Doe</div>
              </div>
            </div>
            <div className="element-6">
              <div className="text-wrapper-8">Time Worked</div>
              <div className="div-wrapper">
                <div className="text-wrapper-9">8 hours</div>
              </div>
            </div>
            <div className="element-7">
              <div className="text-wrapper-8">End Time</div>
              <div className="div-wrapper">
                <div className="text-wrapper-9">4:00 PM</div>
              </div>
            </div>
            <div className="element-8">
              <div className="text-wrapper-8">Start Time</div>
              <div className="div-wrapper">
                <div className="text-wrapper-9">8:00 AM</div>
              </div>
            </div>
          </div>
          <button className="button-2">
            <div className="text-wrapper-10">Log Hours</div>
          </button>
        <p className="p">Clock In | Clock Out</p>
      </div>
      <Header/>
    </div>
  );
};
