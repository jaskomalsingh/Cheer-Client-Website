import React, { useState, useEffect } from 'react';
import StaticStarRating from './StaticStarRating';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../styles/ReadReview.css'; // Ensure correct path

const ReadReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initially, we don't know the user's role, so isAdmin is false
  // It will be updated based on what's stored in localStorage
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Perform the role check within useEffect and adjust isAdmin state accordingly
    const role = localStorage.getItem('role'); // Make sure 'role' is correctly set in your localStorage
    setIsAdmin(role === 'admin'); // Update isAdmin based on whether the logged-in user is an admin

    const fetchReviews = async () => {
      const response = await fetch('http://localhost:3001/api/auth/reviews');
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/auth/reviews/${id}`, {
        method: 'DELETE',
      });
      setReviews(reviews.filter(review => review._id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      
      <div className="review-deck">
        {reviews.length > 0 ? (
          <div className="review-card">
            <h3>{reviews[currentIndex].title}</h3>
            <p>Submitted by {reviews[currentIndex].reviewerName}</p>
            <StaticStarRating rating={reviews[currentIndex].rating} />
            <p>{reviews[currentIndex].text}</p>
            <div className="navigation">
              <button 
              style={{ backgroundColor: '#545c44', color: 'white' }}
              onClick={previousReview}>Previous</button>
              <button 
              style={{ backgroundColor: '#545c44', color: 'white' }}
              onClick={nextReview}>Next</button>
              {/* Conditionally render the Delete button based on isAdmin state */}
              {isAdmin && (
                
                <button 
                style={{ backgroundColor: '#545c44', color: 'white' }}
                onClick={() => deleteReview(reviews[currentIndex]._id)}>Delete Review</button>
              )}
            </div>
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      
    </>
  );
};

export default ReadReview;
