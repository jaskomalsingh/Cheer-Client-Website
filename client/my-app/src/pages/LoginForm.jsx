import React from "react";
import "../styles/style.css";

export const LoginForm = () => {
  return (
    <div className="login-form">
          <div className="form-title">
                <h2>Login</h2>
                <p className="bio">Login to your Account.</p>
          </div>
          <div className="login-form-content">
            <div className="form-wrapper">
              <div className="element-wrapper">
                <div className="input-label">Email</div>
                <div className="input">
                  <div className="example-text">email@email.com</div>
                </div>
              </div>
              <div className="element-wrapper">
                <div className="input-label">Password</div>
                <div className="input">
                  <div className="example-text">Password</div>
                </div>
              </div>
            </div>
            <button className="button">
              <div className="button-text">Login</div>
            </button>
          </div>
        </div>
  );
};

export default LoginForm;