import React, { useState } from 'react';
import StarRating from './StarRating'; // Ensure this component is adapted to use the provided styles as well
import '../styles/WriteReviewPage.css'; // Adjust the path as needed to import your CSS
import Header from './Header';
import Footer from './Footer';

const WriteReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { rating, title, text, reviewerName };

    try {
      const response = await fetch('http://localhost:3001/api/auth/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!response.ok) throw new Error('Error submitting review');
      alert('Review submitted successfully!');
      // Reset form
      setRating(0);
      setTitle('');
      setText('');
      setReviewerName('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div className= "headerDiv">
      <Header/>
    <div className="write-review-container">
      <h2 className="review-title">Leave Us a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <StarRating rating={rating} onRating={setRating} />
        <input
          type="text"
          className="text-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review Title"
          required
        />
        <textarea
          className="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Review Message"
          required
        ></textarea>
        <input
          type="text"
          className="text-input"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <button 
        style={{ backgroundColor: '#545c44', color: 'white' }}
        type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}
export default WriteReviewPage;
