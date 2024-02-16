import React, { useState, useEffect } from "react";
import "../styles/ManageSubscriber.css"; // Ensure this path matches your project structure
import  Header  from './Header.jsx';
import Footer from './Footer.jsx';

function ManageSubscriber() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/newsletter-subscribers');
        if (response.ok) {
          const data = await response.json();
          setSubscribers(data);
        } else {
          throw new Error('Failed to fetch subscribers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const toggleSubscriber = async (email, isSubscribed) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/toggle-newsletter-subscription', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        // Updated to match the backend's expected input format
        body: JSON.stringify({ email, isNews: isSubscribed }),
      });

      if (response.ok) {
        // If toggling was successful, update state to reflect changes
        if (isSubscribed) {
          // Assuming this means re-subscribing or some form of status update, adjust logic as needed
        } else {
          // Remove the subscriber from the list if unsubscribed
          setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
        }
      } else {
        throw new Error('Failed to toggle subscription status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Adjust button onClick to pass the correct isSubscribed status
  return (
    
    <div className="content-management-page">
      <Header/>
      <h1>Manage Subscribers</h1>
      <div className="manage-subscribers">
        {subscribers.map(subscriber => (
          <div key={subscriber.email} className="subscriber-entry">
            <span>{subscriber.email}</span>
            {/* Updated to correctly toggle subscription status */}
            <button onClick={() => toggleSubscriber(subscriber.email, false)}>Remove</button>
          </div>
        ))}
      </div>
      
      <Footer height = "1024px"/>
    </div>
  );
}

export default ManageSubscriber;
