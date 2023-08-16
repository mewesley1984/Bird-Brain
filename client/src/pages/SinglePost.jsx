import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentEntry from '../components/CommentEntry'

import { GET_SINGLE_BIRD } from '../utils/queries';

const SinglePost = () => {
  const { birdId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_BIRD, {
    // pass URL parameter
    variables: { birdId: birdId },
  });
console.log('fetched data for single post:', data)
  const bird = data?.bird || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="my-3">
      <h3>This is a single post.</h3>
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {bird.birdAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this Post on {bird.datePosted}
        </span>
      </h3>

      <div className="my-5">
        <CommentList comments={bird.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentEntry postId={bird._id} />
      </div>
    </div>
  );
};

export default SinglePost;
