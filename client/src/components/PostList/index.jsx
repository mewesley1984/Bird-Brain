import React from 'react'
import { Link } from 'react-router-dom';

const PostList = ({ birds, title }) => {
  if (!birds.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {birds && birds.map((bird) => (
        <div key={bird._id}>
          <Link to={`/birds/${bird._id}`}>
            <h4>{bird.birdName} - {bird.birdAuthor} create this post on {bird.datePosted}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
