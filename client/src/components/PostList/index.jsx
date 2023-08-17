import React from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { GET_BIRD_POSTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { useState, useEffect } from "react";
import Auth from "../../utils/auth";

const PostList = () => {
  const { loading, data, refetch } = useQuery(GET_BIRD_POSTS);

  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error, loading: mutationLoading, data: mutationData }] =
    useMutation(ADD_COMMENT);

  useEffect(() => {
    refetch();
  }, [mutationData]);

  const handleSubmit = async (_id, event) => {
    event.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          _id,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
          createdAt: new Date().toLocaleString(),
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (postId, event) => {
    const { name, value } = event.target;
    // TODO: use post ID somehow
    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div style={{padding: '5rem'}}>
      <h3>Posts</h3>
      {loading && "Loading posts..."}
      {error && "Error fetching posts :-("}
      {data?.birds?.map(
        (post, i) =>
          i < 6 && (
            <Card style={{margin: "2rem 1rem"}} key={post._id}>
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
                <Form onSubmit={(e) => handleSubmit(post._id, e)}>
                  <Card.Title>{post.birdName}</Card.Title>
                  <Card.Text>
                    Author: {post.birdAuthor} <br />
                    Date: {post.datePosted} <br />
                    Text: {post.postText} <br />
                    <h4>Comments:</h4>
                    {post.comments.map((comment, i) => (
                      <div key={i}>
                        {comment.createdAt}: {comment.commentAuthor} said:{" "}
                        {comment.commentText}
                      </div>
                    ))}
                  </Card.Text>

                  {!mutationData && Auth.loggedIn() && (
                    <>
                      <Form.Control
                        name="commentText"
                        value={commentText}
                        onChange={(e) => handleChange(post._id, e)}
                        id={post._id}
                        as="textarea"
                        rows={3}
                      />
                      <Button variant="primary" type="submit"  className="my-3"style={{ backgroundColor: '#333000', color: 'wheat' }}>
                        Add Comment
                      </Button>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          )
      )}
    </div>
  );
};

export default PostList;
