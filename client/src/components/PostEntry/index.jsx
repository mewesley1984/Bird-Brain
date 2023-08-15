import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {searchBirdAPI } from '../../utils/API';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row} from 'react-bootstrap';
// import { ADD_BIRD_POST } from '../../utils/mutations';
// import { GET_BIRD_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';

const SearchBirds = () => {

  const [searchedBirds, setSearchedBirds] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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
        throw new Error('something went wrong!');
      }

      const  items  = await response.json();
      console.log(items)
      const birdData = items.entities.map((bird) => ({
        birdId: bird.id,
        birdName: bird.name,
        birdImage: bird.images || ['No Image Found'],
      }));

      setSearchedBirds(birdData);
      setSearchInput('');
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
      <Container>
      <h1>Search Birds</h1>
      <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a bird'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        <Container>
          <h2 className='pt-5'>
            {searchedBirds.length
            ? `Viewing ${searchedBirds.length} results:`
            : 'Search for a bird to begin'}
          </h2>
          <Row>
            {searchedBirds.map((bird) => {
              return (
                <Col md="4" key={bird.birdId}>
                  <Card border='dark'>
                    {bird.image ? (
                      <Card.Img src={bird.image} alt={`This is a ${bird.name}`}
                      variant='top'/>
                    ) : null}
                  <Card.Body>
                    <Card.Name>{bird.name}</Card.Name>
                  </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </>
  );      
};

export default SearchBirds;