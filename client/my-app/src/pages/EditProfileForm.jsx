import React, { useState } from 'react';
import "../styles/style.css";

const EditProfileForm = () => {
    const [fullName, setFullName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  
    return (
      <form className="edit-profile-form">
        <div className="edit-profile-label">
          <div className="form-title">
            <h2>Edit User Profile</h2>
            <p className="bio">Edit your personal details and preferences.</p>
          </div>
        </div>
        <div className="edit-profile-form-content">
          <div className="form-wrapper">
            <div className="element-wrapper">
              <label htmlFor="fullName" className="input-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
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
          <button type="button" className="button">
            <div className="button-text">Save Changes</div>
          </button>
        </div>
      </form>
    );
  };
  

export default EditProfileForm;
