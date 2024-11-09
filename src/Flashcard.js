// src/Flashcard.js
import React, { useState } from 'react';

const Flashcard = ({ card, onReview }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = () => {
    setShowAnswer(true);
  };

  const handleRating = (rating) => {
    onReview(card.id, rating);
    setShowAnswer(false); // Hide answer after review
  };

  return (
    <div className="flashcard">
      <div className="question">
        <h2>{card.question}</h2>
        <button onClick={handleAnswerClick}>Show Answer</button>
      </div>
      {showAnswer && (
        <div className="answer">
          <p>{card.answer}</p>
          <div className="rating">
            <h3>How well did you know this?</h3>
            <button onClick={() => handleRating(1)}>1 (Hard)</button>
            <button onClick={() => handleRating(2)}>2 (Good)</button>
            <button onClick={() => handleRating(3)}>3 (Easy)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
