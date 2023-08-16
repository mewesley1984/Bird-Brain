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
          <h4>{bird.birdName}</h4>
          <img src={bird.birdImage}></img>
          <h5>{bird.birdAuthor} created this post on {bird.datePosted}</h5>
        </div>
      ))}
    </div>
  );
};

export default PostList;
