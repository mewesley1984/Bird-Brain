import { Link } from 'react-router-dom';

const PostList = ({ birds, title }) => {
  if (!birds.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {birds &&
        birds.map((bird) => (
          <div key={bird._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {bird.birdAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                created a bird post on {bird.datePosted}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{bird.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/birds/${bird._id}`}
            >
              Join the discussion on this bird post.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
