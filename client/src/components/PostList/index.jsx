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
    <div>
      <h3>Posts</h3>
      {loading && "Loading posts..."}
      {error && "Error fetching posts :-("}
      {data?.birds?.map(
        (post, i) =>
          i < 6 && (
            <Card border="dark" key={post._id}>
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
                  Text: {post.postText} <br />
                  <h4>Comments:</h4>
                  {post.comments.map((comment) => (
                    <div>
                      {comment.createdAt}: {comment.commentAuthor} said:{" "}
                      {comment.commentText}
                    </div>
                  ))}
                </Card.Text>
                {/* {!mutationData && (
                  <> */}
                    <Form onSubmit={(e) => handleSubmit(post._id, e)}>
                      <Form.Control
                        name="commentText"
                        value={commentText}
                        onChange={(e) => handleChange(post._id, e)}
                        as="textarea"
                        rows={3}
                        birdId={post._id}
                      />
                      <Button variant="primary" type="submit">
                        Add Comment
                      </Button>
                    </Form>
                  {/* </>
                )} */}
              </Card.Body>
            </Card>
          )
      )}
    </div>
  );
};

export default PostList;
