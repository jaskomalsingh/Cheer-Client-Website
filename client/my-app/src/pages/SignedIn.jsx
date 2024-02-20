import React from 'react';


const SignedIn = () => {

    const email = localStorage.getItem('email');

    return (
        <div>
            <h1>Hello {email}</h1>
        </div>
    );
};

export default SignedIn;
