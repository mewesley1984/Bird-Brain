import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
 }
`;

export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BIRD_POST = `gql
  mutation addBirdPost($description: String!, $birdId: ID!){
    addBirdPost(description: $description, birdId: $birdId) {
      _id
      description
      birdId
    }
  }
`;

export const EDIT_BIRD_POST = gql`
  mutation editBirdPost($birdId: ID!, $description: String!) {
    editBirdPost(birdId: $birdId, description: $description) {
      _id
      description
      birdId
    }
  }
`;

export const DELETE_BIRD_POST =gql`
  mutation deleteBirdPost($birdId: ID!) {
    deleteBirdPost(birdId: $birdId) {
      _id
      description
      birdId
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($birdId: ID!, $text: String!) {
    addComment(birdId: $birdId, text: $text) {
      _id
      text
      datePosted
      bird {
        _id
        description
      }
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($commentId: ID!, $text: String!) {
    editComment(commentId: $commentId, text: $text) {
      _id
      text
      datePosted
      bird {
        _id
        description
      }
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commendId: ID!) {
    deleteComment(commentId: $commendId) {
      _id
      text
      datePosted
      bird {
        _id
        description
      }
      user {
        _id
        username
      }
    }
  }
`;