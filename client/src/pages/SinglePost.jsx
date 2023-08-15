// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentEntry from '../components/CommentEntry'

import { GET_SINGLE_BIRD } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { birdId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_BIRD, {
    // pass URL parameter
    variables: { birdId: birdId },
  });

  const birdPost = data?.birdPost || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {birdPost.birdPostAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this Post on {birdPost.datePosted}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {birdPost.description}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={birdPost.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentEntry postId={birdPost._id} />
      </div>
    </div>
  );
};

export default SinglePost;
