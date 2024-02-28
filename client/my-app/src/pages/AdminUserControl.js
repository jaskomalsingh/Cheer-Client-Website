import React, { useState, useEffect } from "react";
import "../styles/ManageSubscriber.css"; // Ensure this path matches your project structure
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CMSideBar from "./CMSideBar.jsx";

function ManageSubscriber() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/getallusers');
        if (response.ok) {
          const data = await response.json();
          setSubscribers(data);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const toggleSubscriber = async (email, isSubscribed) => {
    // Toggle functionality here, possibly updating isDeactivated or isNews
  };

  return (
    <div className="content-management-page">
      <Header />
      <h1 className="text-wrapper-heading">Manage Subscribers</h1>
      
      <div className="manage-subscribers">
        <CMSideBar currentTab="Subscribers"/>
        <div className="subscribers">
          {subscribers.map((subscriber, index) => (
            <div key={index} className="subscriber-entry">
              <div className="subscriber-info">
                <span><strong>Name:</strong> {subscriber.fullname}</span>
                <span><strong>Email:</strong> {subscriber.email}</span>
                <span><strong>Deactivated:</strong> {subscriber.isDeactivated ? 'Yes' : 'No'}</span>
                <span><strong>Newsletter:</strong> {subscriber.isNews ? 'Subscribed' : 'Unsubscribed'}</span>
                <span><strong>Role:</strong> {subscriber.role}</span>
              </div>
              <button onClick={() => toggleSubscriber(subscriber.email, !subscriber.isNews)}>
                {subscriber.isNews ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer height="1024px"/>
    </div>
  );
}

export default ManageSubscriber;
