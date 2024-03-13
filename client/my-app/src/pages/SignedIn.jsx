import React from 'react';


const SignedIn = () => {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    return (
        <div>
            <h1>Hello {email}{role}</h1>
        </div>
    );
};

export default SignedIn;
