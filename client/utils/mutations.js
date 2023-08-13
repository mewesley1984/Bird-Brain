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