import React from 'react'
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { GET_BIRD_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const PostList = () => {
  const { loading, error, data } = useQuery(GET_BIRD_POSTS);
  return (
    <div>
      <h3>Posts</h3>
      {loading && "Loading posts..."}
      {error && "Error fetching posts :-("}
      {data?.birds?.map((post, i) => (
        i < 6 && <Card border="dark">
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
                </Card.Body>
              </Card>
      ))}
    </div>
  );
};

export default PostList;
