import React from 'react';

const SignedIn = () => {
  // Retrieve the email from localStorage
  const email = localStorage.getItem('email');

  return (
    <div> 
      <h1>Hello {email}</h1>
    </div>
  );
};

export default SignedIn;
