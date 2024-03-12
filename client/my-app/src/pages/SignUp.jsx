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
  let body

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Data to be sent to the backend
    const signUpData = {

     
    };
    body = JSON.stringify({
      fullname: fullName,
      password: password,
      email: email,
      role: "user", // Assuming 'User' as a default role
      isNews: subscribeToNewsletter,
    })
    


    try {
      // Sending a POST request to the backend
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });


      if (response.status === 200) {
        console.log('Sign up successful:', response.message);
        alert("Sign up successful, Please continue to login")
        // Handle successful sign up (e.g., redirect to login page or display success message)
      } else {
        console.log('Sign up failed:', response.message);
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
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