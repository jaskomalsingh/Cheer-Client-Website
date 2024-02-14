// import React, { useState } from 'react';

// export const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log('Form values:', {
//       email,
//       password,
//     });
//     // Implement your logic for login here
//   };

//   return (
//     <div className="login-form">
//       <div className="form-title">
//         <h2>Login</h2>
//         <p className="bio">Login to your Account.</p>
//       </div>
//       <div className="login-form-content">
//         <div className="form-wrapper">
//           <div className="element-wrapper">
//             <label htmlFor="loginEmail" className="input-label">
//               Email
//             </label>
//             <input
//               type="email"
//               id="loginEmail"
//               placeholder='example@email.com'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="element-wrapper">
//             <label htmlFor="loginPassword" className="input-label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="loginPassword"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>
//         <button type="button" className="button" onClick={handleLogin}>
//           <div className="button-text">Login</div>
//         </button>
//       </div>
//     </div>
//   );
// };


// export default LoginForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
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
      console.log(errorData.status)
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
    <div className="login-form">
      <div className="form-title">
        <h2>Login</h2>
        <p className="bio">Login to your Account.</p>
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
