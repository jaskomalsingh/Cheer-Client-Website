import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [resendVerification, setResendVerification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInUser = async (event) => {
    event.preventDefault();

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

      const errorData = await response.json();
      
      if (errorData.status === 'ok') {
        localStorage.setItem('jwtToken', errorData.token);
        localStorage.setItem('email', email);
        alert('Log in successful');
        navigate('/authhome');
      } else {
        setError(errorData.message);
        if (errorData.resendVerification) {
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
    <div className='login-container'>
      <h1 className='login-header'>Log In To The Superhero Database</h1>
      {error && <p className='error-msg'>{error}</p>}

      <form onSubmit={logInUser} className='login-form'>
        <TextInput value={formData.email} handleChange={handleChange} name='email' placeholder='Email' />
        <TextInput value={formData.password} handleChange={handleChange} name='password' placeholder='Password' />
        <input type='submit' value='Log In!' className='submit-button' />
      </form>

      {resendVerification && (
        <div>
          <p>Your account is not verified. Resend the verification email?</p>
          <button onClick={resendVerificationEmail} className='resend-button'>Resend Verification Email</button>
        </div>
      )}

      <NavigationButtons />
    </div>
  );
};

const TextInput = ({ value, handleChange, name, placeholder }) => (
  <input
    value={value}
    onChange={handleChange}
    type={name === 'password' ? 'password' : 'email'}
    name={name}
    placeholder={placeholder}
    className='text-input'
  />
);

const NavigationButtons = () => (
  <div className='mainbutton-container'>
    <Link to='/'>
      <button className='main-button'>Return to Home</button>
    </Link>
  </div>
);

export default SignIn;
