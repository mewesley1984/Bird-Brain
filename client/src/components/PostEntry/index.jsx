import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BIRD_POST } from '../../utils/mutations';
import { GET_BIRD_POSTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostEntry = () => {
  const [description, setDescription] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addBirdPost, { error }] = useMutation(ADD_BIRD_POST, {
    update(cache, { data: { addBirdPost } }) {
      try {
        const { posts } = cache.readQuery({ query: GET_BIRD_POSTS });

        cache.writeQuery({
          query: GET_BIRD_POSTS,
          data: { posts: [addBirdPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBirdPost({
        variables: {
          description,
          birdAuthor: Auth.getProfile().data.username,
        },
      });

      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'description' && value.length <= 280) {
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>A place for Bird Brains to connect.</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="description"
                placeholder="Here's a new post..."
                value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostEntry;