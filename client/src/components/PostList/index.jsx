import React from 'react'
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { GET_BIRD_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { useState } from 'react';

const PostList = () => {
  const { loading,data } = useQuery(GET_BIRD_POSTS);

    const [commentText, setCommentText] = useState('');
    const [characterCount,setCharacterCount] = useState(0);
  
    const [addComment, { error }] = useMutation(ADD_COMMENT);
    const handleFormSubmit = async (event) => {
      event.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          birdId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Posts</h3>
      {loading && "Loading posts..."}
      {error && "Error fetching posts :-("}
      {data?.birds?.map((post, i) => (
        i < 6 && <Card border="dark" key={i}>

                {post.birdImage ? (
                  <Card.Img
                    style={{
                      margin: "1rem",
                      width: "5rem",
                      borderRadius: "5px",
                    }}
                    src={post.birdImage}
                    alt={`This is a ${post.birdName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{post.birdName}</Card.Title>
                  <Card.Text>
                    Author: {post.birdAuthor} <br />
                    Date: {post.datePosted} <br />
                    Text: {post.postText}
                    </Card.Text>                   
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onSubmit={handleFormSubmit}>
                        <Form.Control name="commentText" value={commentText} onChange={handleChange}  as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary">Add Comment</Button>{' '}
                </Card.Body>
              </Card>
      ))}
    </div>
  );
};

export default PostList;
