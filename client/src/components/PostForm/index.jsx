import { useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const PostForm = () => {
  const location = useLocation();
  const selectedBird = location.state?.selectedBird;

  return (
    <Card border="dark">
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
      <Card.Body>
        <Card.Text>Behold! The Magnificent {selectedBird.name}!</Card.Text>
      </Card.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Create a Bird Post:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary">Add Post</Button>
      </Form>
    </Card>
  );
};

export default PostForm;
