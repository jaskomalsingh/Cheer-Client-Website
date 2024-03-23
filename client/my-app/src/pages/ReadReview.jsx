// ReadReview.jsx
import React, { useState, useEffect } from 'react';
import StaticStarRating from './StaticStarRating';
import '../styles/ReadReview.css'; // Ensure to create and import your CSS

const ReadReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch reviews from your backend
    const fetchReviews = async () => {
      const response = await fetch('http://localhost:3001/api/auth/reviews');
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="review-deck">
      {reviews.length > 0 ? (
        <div className="review-card">
          <h3>{reviews[currentIndex].title}</h3>
          <p>Submitted by {reviews[currentIndex].reviewerName}</p>
          <StaticStarRating rating={reviews[currentIndex].rating} />
          <p>{reviews[currentIndex].text}</p>
          <div className="navigation">
            <button onClick={previousReview}>Previous</button>
            <button onClick={nextReview}>Next</button>
          </div>
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReadReview;
