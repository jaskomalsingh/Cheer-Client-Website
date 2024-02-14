import React from "react";
import CheckBoxWithLabel from "./CheckBoxWithLabel";
import "../styles/style.css";

export const EditProfileForm = () => {
  return (
    <div className="edit-profile-form">
      <div className="edit-profile-label">
        <div className="form-title">
          <h2>Edit User Profile</h2>
          <p className="bio">Edit your personal Details and Prefrences.</p>
        </div>
      </div>
      <div className="edit-profile-form-content">
        <div className="form-wrapper">
          <div className="element-wrapper">
            <div className="input-label">Full Name</div>
            <div className="input">
              <div className="example-text">John Doe</div>
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="element-wrapper">
            <div className="input-label">Old Password</div>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="element-wrapper">
            <div className="input-label">New Password</div>
            <div className="input">
              <div className="example-text">Password</div>
            </div>
          </div>
          <div className="element-wrapper">
            <div className="input-label">Confirm New Password</div>
            <div className="input">
              <div className="example-text">Password</div>
            </div>
          </div>
        </div>
        <CheckBoxWithLabel />
        <button className="button">
          <div className="button-text">Save Changes</div>
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
