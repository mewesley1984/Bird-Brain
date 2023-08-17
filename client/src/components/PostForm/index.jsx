import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { SAVE_BIRD_POST } from "../../utils/mutations";
import Auth from "../../utils/auth";

const PostForm = () => {
  const location = useLocation();
  const [postText, setPostText] = useState();
  const [newPost, setNewPost] = useState();
  const [saveBird, { loading, error, data }] = useMutation(SAVE_BIRD_POST);

  useEffect(() => {
    setNewPost({
      birdId: location.state?.selectedBird?.id,
      birdName: location.state?.selectedBird?.name,
      birdImage: location.state?.selectedBird?.image,
      birdAuthor: Auth.getProfile().data.username,
      datePosted: new Date().toLocaleString(),
      postText: null,
    });
  }, [Auth.getProfile().data.username, location.state?.selectedBird]);

  // import useMutation
  // form state variables (useState)
  // handler function
  const selectedBird = location.state?.selectedBird;

  const handleSubmit = async (event) => {
    const toSave = { ...newPost, postText };
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await saveBird({ variables: { ...toSave } });

      if (!response.data) {
        throw new Error("something went wrong!");
      }

       window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (data) {
    return `Saved post: ${data.saveBirdPost.postText} ${data.saveBirdPost.datePosted}` 
  }

  return (
    <Card>
      <Card.Title>{selectedBird.name}</Card.Title>
      {selectedBird.image ? (
        <Card.Img
          style={{
            margin: "1rem",
            width: "18rem",
            borderRadius: "5px",
          }}
          src={selectedBird.image}
          alt={`This is a ${selectedBird.name}`}
          variant="top"
        />
      ) : null}
      {loading && "Saving..."}
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Create a Bird Post:</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              onChange={(e) => setPostText(e.target.value)}
            />
          </Form.Group>
          <Button varient="primary" type="submit" style={{ backgroundColor: '#333000', color: 'wheat' }}>
            Add Post
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default PostForm;
