

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
  
      if (response.status === 200) {
        const userData = await response.json();
        localStorage.setItem('fullname', userData.fullname);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('isDeactivated', userData.isDeactivated.toString());
        localStorage.setItem('role', userData.role);//'Admin', 'User', 'Employee', 'VerifiedUser'
        localStorage.setItem('isNews', userData.isNews.toString());
        alert('Log in successful');
        navigate('/');
      } else {
        let errorMessage;
        if (response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = 'Failed to log in. Please try again later.';
        }
        setError(errorMessage);
      }
    } catch (error) {
      alert(error)
      setError('An error occurred during login. Please try again later.');
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
              className="text-input"
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
              className="text-input"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>
        
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
