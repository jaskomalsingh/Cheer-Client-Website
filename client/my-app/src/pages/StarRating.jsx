import React from 'react';
import '../styles/style.css'; // Ensure this is the correct path to your CSS file

const StarRating = ({ rating, onRating }) => {
  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`star-button ${index <= rating ? 'filled' : ''} button`} // Using `button` class for styling
            onClick={() => onRating(index)}
          >
            &#9733; {/* This is a star character, you can also use icons */}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
