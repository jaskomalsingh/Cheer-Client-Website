// StaticStarRating.jsx
import React from "react";

const StaticStarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index} className={index <= rating ? "on" : "off"}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StaticStarRating;
