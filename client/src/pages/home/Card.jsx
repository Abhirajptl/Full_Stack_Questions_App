import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/${post._id}`)}>
      <h2 className="card__heading">{post?.topic}</h2>
      <div className="card__content">
        <p className="card__question"><strong>Q:</strong> {post?.question}</p>
        <p className="card__answer">{post?.answer}</p>
      </div>
    </div>
  );
};

export default Card;