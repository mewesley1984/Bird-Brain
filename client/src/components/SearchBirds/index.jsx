import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { searchBirdAPI } from "../../utils/API";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { SEARCH_BIRDS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const SearchBirds = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // const [savedBirdIds, setSavedBirdIds] = useState(getSavedBirdIds());
  // const [saveBird, { loading, error, data }] = useMutation(SAVE_BIRD);

  // useEffect(() => {

  //   return() => savedBirdIds(savedBirdIds);
  // });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchBirdAPI(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();
      console.log(items);
      const birdData = items.entities.map((bird) => ({
        id: bird.id,
        name: bird.name,
        sciName: bird.sciName,
        status: bird.status,
        image: bird.images?.[0] || ["No Image Found"],
      }));

      setSearchResults(birdData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSaveBird = async (birdId) => {
  //   // find the book in `searchedBooks` state by the matching id
  //   const birdToSave = searchedBirds.find((bird) => bird.birdId === birdId);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await saveBird({variables: {bird: birdToSave}})

  //     if (!response.data) {
  //       throw new Error('something went wrong!');
  //     }

  //     // if book successfully saves to user's account, save book id to state
  //     setSavedBirdIds([...savedBirdIds, birdToSave.birdId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Container className="marmelad p-4 d-flex flex-column justify-content-center align-items-center">
        <h1 className="green-class">Search Birds</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a bird"
              />
            </Col>
            <Col xs={12} md={4} className="text-center mt-4 mt-md-0">
              <Button type="submit" variant="success" size="lg" style={{ backgroundColor: '#333000'}}>
                Submit&nbsp;Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <h2 className="pt-5">
          {searchResults.length
            ? `Viewing ${searchResults.length} results:`
            : null}
        </h2>
        <Row>
          {searchResults?.map((bird) => (
            <Col style={{ margin: "1rem" }}>
              <Card className="hover-card">
                {bird.image ? (
                  <Card.Img
                    style={{
                      margin: "1rem",
                      width: "18rem",
                      borderRadius: "5px",
                    }}
                    src={bird.image}
                    alt={`This is a ${bird.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{bird.name}</Card.Title>
                  <Card.Text>Behold! The Magnificent {bird.name}!</Card.Text>
                  <Card.Text>Latin Name: {bird.sciName}</Card.Text>
                  {bird.status ? <Card.Text>Conservation Status: {bird.status}</Card.Text> : null}
                  {Auth.loggedIn() && (
                    <Link
                      // className="btn btn-lg  m-2"
                      state={{ selectedBird: bird }}
                      to={{
                        pathname: "/create-post",
                      }}
                    >
                      <Button className="btn-block btn-info m-2" style={{ backgroundColor: '#333000', color: 'wheat' }}>
                        Create Post
                      </Button>
                    </Link>
                  )}
                  {!Auth.loggedIn() && (
                    <Link className="btn btn-lg btn-info m-2" to="/login" style={{ backgroundColor: '#333000', color: 'wheat' }}>
                      Login to post about this bird.
                    </Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBirds;
