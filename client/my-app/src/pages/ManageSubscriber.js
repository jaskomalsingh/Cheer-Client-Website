import React, { useState, useEffect } from "react";
import "../styles/ManageSubscriber.css";
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
    <div className="content-management-page">
      <Header />
      <h1 className="text-wrapper-heading">Manage Subscribers</h1>
      <div className="manage-subscribers">
        <CMSideBar currentTab="Subscribers"/>
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
                  <div className="checkbox-wrapper-5">
                    <div className="check">
                      <input
                        id={`deactivated-${index}`}
                        type="checkbox"
                        checked={subscriber.isDeactivated}
                        onChange={(e) => handleChange(index, { isDeactivated: e.target.checked })}
                      />
                      <label htmlFor={`deactivated-${index}`}></label>
                    </div>
                  </div>
                </div>
                <div>
                  <strong>Newsletter:</strong>
                  <div className="checkbox-wrapper-5">
                    <div className="check">
                      <input
                        id={`newsletter-${index}`}
                        type="checkbox"
                        checked={subscriber.isNews}
                        onChange={(e) => handleChange(index, { isNews: e.target.checked })}
                      />
                      <label htmlFor={`newsletter-${index}`}></label>
                    </div>
                  </div>
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
      <style>
        {`
          .checkbox-wrapper-5 .check {
            --size: 40px;
            position: relative;
            background: linear-gradient(90deg, #f19af3, #f099b5); /* Original gradient background */
            line-height: 0;
            perspective: 400px;
            font-size: var(--size);
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"],
          .checkbox-wrapper-5 .check label,
          .checkbox-wrapper-5 .check label::before,
          .checkbox-wrapper-5 .check label::after,
          .checkbox-wrapper-5 .check {
            appearance: none;
            display: inline-block;
            border-radius: var(--size);
            border: 0;
            transition: .35s ease-in-out;
            box-sizing: border-box;
            cursor: pointer;
          }
          
          .checkbox-wrapper-5 .check label {
            width: calc(2.2 * var(--size));
            height: var(--size);
            background: #d7d7d7; /* Original unchecked background */
            overflow: hidden;
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"] {
            position: absolute;
            z-index: 1;
            width: calc(.8 * var(--size));
            height: calc(.8 * var(--size));
            top: calc(.1 * var(--size));
            left: calc(.1 * var(--size));
            background: linear-gradient(45deg, #dedede, #ffffff); /* Original button background */
            box-shadow: 0 6px 7px rgba(0,0,0,0.3);
            outline: none;
            margin: 0;
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"]:checked {
            left: calc(1.3 * var(--size));
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label {
            background: #575f46; /* Updated checked background to hex value */
          }
          
          .checkbox-wrapper-5 .check label::before,
          .checkbox-wrapper-5 .check label::after {
            content: "· ·";
            position: absolute;
            overflow: hidden;
            left: calc(.15 * var(--size));
            top: calc(.5 * var(--size));
            height: var(--size);
            letter-spacing: calc(-0.04 * var(--size));
            color: #9b9b9b; /* Original dot color */
            font-family: "Times New Roman", serif;
            z-index: 2;
            font-size: calc(.6 * var(--size));
            border-radius: 0;
            transform-origin: 0 0 calc(-0.5 * var(--size));
            backface-visibility: hidden;
          }
          
          .checkbox-wrapper-5 .check label::after {
            content: "●";
            top: calc(.65 * var(--size));
            left: calc(.2 * var(--size));
            height: calc(.1 * var(--size));
            width: calc(.35 * var(--size));
            font-size: calc(.2 * var(--size));
            transform-origin: 0 0 calc(-0.4 * var(--size));
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::before,
          .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
            left: calc(1.55 * var(--size));
            top: calc(.4 * var(--size));
            line-height: calc(.1 * var(--size));
            transform: rotateY(360deg);
          }
          
          .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
            height: calc(.16 * var(--size));
            top: calc(.55 * var(--size));
            left: calc(1.6 * var(--size));
            font-size: calc(.6 * var(--size));
            line-height: 0;
          }
          
        `}
      </style>
    </div>
  );
}

export default ManageSubscriber;
