import React from "react";
import CheckBoxWithLabel from "./CheckBoxWithLabel";
import Header from "./Header";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import "../styles/style.css";

export const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="div">
      <LoginForm className="login-form-instance" />
        <div className="sign-up-form">
          <div className="form-title">
                <h2>Sign-Up</h2>
                <p className="bio">Sign-up to create an account using your personal details.</p>
          </div>
          <div className="sign-up-form-content">
            <div className="form-wrapper">
              <div className="element-wrapper">
                <div className="input-label">Full Name</div>
                <div className="input">
                  <div className="example-text">John Doe</div>
                </div>
              </div>
              <div className="element-wrapper">
                <div className="input-label">Email</div>
                <div className="input">
                  <div className="example-text">email@email.com</div>
                </div>
              </div>
            </div>
            <div className="form-wrapper">
              <div className="element-wrapper">
                <div className="input-label">Password</div>
                <div className="input">
                  <div className="example-text">Password</div>
                </div>
              </div>
              <div className="element-wrapper">
                <div className="input-label">Confirm Password</div>
                <div className="input">
                  <div className="example-text">Password</div>
                </div>
              </div>
            </div>
            <CheckBoxWithLabel />
            <button className="button">
              <div className="button-text">Sign Up</div>
            </button>
          </div>
        </div>
        <hr className="line"/>
      </div>
      <Header/>
    </div>
  );
};