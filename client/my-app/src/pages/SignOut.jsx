import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the user's role or authentication token from local storage
        localStorage.clear();
        // Or if using a token
        // localStorage.removeItem('authToken');

        // Redirect to the home page or sign-in page after signing out
        navigate('/'); // Use the correct path to your sign-in page
    }, [navigate]);

    return (
        <div>Signing out...</div>
    );
}

export default SignOut;
