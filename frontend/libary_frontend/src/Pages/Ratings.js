import React, { useState } from 'react';


const Ratings = ({ rating }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className="rating-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="star">★</span>
        ))}
        {hasHalfStar && <span className="star">½</span>}
      </div>
      {isHovered && (
        <div className="rating-number">{rating.toFixed(1)}</div>
      )}
    </div>
  );
};

export default Ratings;
