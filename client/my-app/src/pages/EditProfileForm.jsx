import React, { useState } from 'react';
import "../styles/style.css";

const EditProfileForm = () => {
  const storedFullName = localStorage.getItem('fullname') || '';
  const storedIsNews = localStorage.getItem('isNews') === 'true';
  const email = localStorage.getItem('email') || '';

  const [fullName, setFullName] = useState(storedFullName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(storedIsNews);
  const [error, setError] = useState('');
  let body;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }
    if(newPassword){
      body = JSON.stringify({
        email: email,
        fullname: fullName,
        oldp: oldPassword,
        newp: newPassword,
        isNews: subscribeToNewsletter,
      })
    
    } else {
      body = JSON.stringify({
        email: email,
        fullname: fullName,
        isNews: subscribeToNewsletter,
      })
  
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/editprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      alert('Profile updated successfully');
      // Optionally, update local storage or state as needed
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <div className="edit-profile-label">
        <div className="form-title">
          <h2>Edit User Profile</h2>
          <p className="bio">Edit your personal details and preferences.</p>
        </div>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <div className="edit-profile-form-content">
        <div className="form-wrapper">
          <div className="element-wrapper">
            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="text-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-wrapper">
          <div className="element-wrapper">
            <label htmlFor="oldPassword" className="input-label">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="text-input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-wrapper">
          <div className="element-wrapper">
            <label htmlFor="newPassword" className="input-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="text-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="element-wrapper">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="text-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-wrapper">
          <div className="element-wrapper">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="subscribeToNewsletter"
                checked={subscribeToNewsletter}
                onChange={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
                style={{ marginLeft: '8px' }}
              />
              Subscribe to Newsletter
            </label>
          </div>
        </div>
        <button type="submit" className="button"> {/* Ensure this is type="submit" for form submission */}
          <div className="button-text">Save Changes</div>
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
