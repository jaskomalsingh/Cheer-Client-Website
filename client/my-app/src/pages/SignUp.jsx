import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import "../styles/style.css";

export const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Form values:', {
      fullName,
      email,
      password,
      confirmPassword,
      subscribeToNewsletter,
    });
    // Implement your logic for sign up here
  };

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
                <label htmlFor="fullName" className="input-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  placeholder='John Doe'
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="element-wrapper">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder='example@email.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-wrapper">
              <div className="element-wrapper">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="element-wrapper">
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm Password
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
            <button type="button" className="button" onClick={handleSignUp}>
              <div className="button-text">Sign Up</div>
            </button>
          </div>
        </div>
        <hr className="line" />
      </div>
      <Header />
    </div>
  );
};