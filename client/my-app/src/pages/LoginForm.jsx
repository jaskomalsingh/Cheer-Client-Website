

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [resendVerification, setResendVerification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInUser = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });

    
    
      if (response.ok) {
        const userData = await response.json(); // Correctly extract JSON data from the response
        localStorage.setItem('fullname', userData.fullname);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('isDeactivated', userData.isDeactivated.toString()); // Convert boolean to string
        localStorage.setItem('isVerified', userData.isVerified.toString()); // Convert boolean to string
        localStorage.setItem('role', userData.role);
        localStorage.setItem('isNews', userData.isNews.toString()); // Convert boolean to string
        alert('Log in successful');
        navigate('/signedin');
      } else {
        
        setError(response.message);
        if (response.resendVerification) {
          setResendVerification(true);
        }
      }
    } catch (error) {
      
      setError('An error occurred during login');
    }
  };

  const resendVerificationEmail = async () => {
    const response = await fetch(`http://localhost:3001/api/auth/resendVerification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email }),
    });

    const responseData = await response.json();
    if (responseData.status === 'ok') {
      alert('Verification email resent successfully');
    } else {
      setError(responseData.message);
    }
  };

  return (
    <div className="login-form">
      <div className="form-title">
        <h2>Login</h2>
        <p className="bio">Login to your Account.</p>
        {error && <p className="error-msg">{error}</p>}
      </div>
      <div className="login-form-content">
        <div className="form-wrapper">
          <div className="element-wrapper">
            <label htmlFor="loginEmail" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="loginEmail"
              placeholder='example@email.com'
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="element-wrapper">
            <label htmlFor="loginPassword" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          {resendVerification && (
            <div className="resend-verification">
              <p>Your account is not verified. Resend the verification email?</p>
              <button onClick={resendVerificationEmail} className="resend-button">Resend Verification Email</button>
            </div>
          )}
        </div>
        <button type="button" className="button" onClick={logInUser}>
          <div className="button-text">Login</div>
        </button>
      </div>
    </div>
  );
};


// Remove TextInput and NavigationButtons components as they are not used in LoginForm component

export default LoginForm;
