import React from "react";
import LoginForm from "./LoginForm";
import "../styles/style.css";
import Header from "./Header";
import { Footer } from "./Footer";
import EditProfileForm from "./EditProfileForm";

export const EditUserProfile = () => {
  return (
    <div className="edit-user-profile">
      <div className="div">
        <Header/>
        <EditProfileForm className="login-form-instance" />
      </div>
    </div>
  );
};