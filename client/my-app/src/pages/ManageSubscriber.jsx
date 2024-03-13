import React, { useState, useEffect } from "react";
import "../styles/ManageSubscriber.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CMSideBar from "./CMSideBar.jsx";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../styles/cmsidebar.css";
import { useMediaQuery } from 'react-responsive';

function ManageSubscriber() {
  const [subscribers, setSubscribers] = useState([]);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

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

  const handleSave = async (userIndex) => {
    const user = subscribers[userIndex];
    try {
      const response = await fetch('http://localhost:3001/api/auth/updateuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: user.fullname,
          email: user.email,
          isDeactivated: user.isDeactivated,
          role: user.role,
          isNews: user.isNews,
          // Removed isVerified as it's not used in the backend update operation
        }),
      });
      if (response.ok) {
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  const handleChange = (userIndex, changes) => {
    const updatedSubscribers = [...subscribers];
    updatedSubscribers[userIndex] = { ...updatedSubscribers[userIndex], ...changes };
    setSubscribers(updatedSubscribers);
  };

  return (
    <Container fluid>
      <div className="content-management-page">
        <Header />
        <h1 className="text-wrapper-heading">Content Management</h1>

        <div className="manage-subscribers">
          <div className="text-wrapper-heading">Manage Subscribers</div>
          <CMSideBar currentTab="Subscribers" />
          <div className="subscribers">
            {subscribers.map((subscriber, index) => (
              <div key={index} className="subscriber-entry">
                <div className="subscriber-info">
                  <div>
                    <strong>Name:</strong>
                    <input
                      type="text"
                      value={subscriber.fullname}
                      onChange={(e) => handleChange(index, { fullname: e.target.value })}
                    />
                  </div>
                  <div><strong>Email:</strong> {subscriber.email}</div>
                  <div>
                    <strong>Deactivated:</strong>
                    <input
                      type="checkbox"
                      checked={subscriber.isDeactivated}
                      onChange={(e) => handleChange(index, { isDeactivated: e.target.checked })}

                    />
                  </div>
                  <div>
                    <strong>Newsletter:</strong>
                    <input
                      type="checkbox"
                      checked={subscriber.isNews}
                      onChange={(e) => handleChange(index, { isNews: e.target.checked })}
                    />
                  </div>
                  <div>
                    <strong>Role:</strong>
                    <select
                      value={subscriber.role}
                      onChange={(e) => handleChange(index, { role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="verifiedUser">Verified User</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => handleSave(index)}>Save</button>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
}

export default ManageSubscriber;
