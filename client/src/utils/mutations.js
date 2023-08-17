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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BIRD_POST = gql`
  mutation addBird($birdName: String!, $birdId: Int!, $birdImage: String!,$birdAuthor: String!, $postText: String!){
    addBird(birdName: $birdName,birdId:$birdId,birdImage: $birdImage, birdAuthor: $birdAuthor, postText: $postText) {
      birdName
      birdId
      birdImage
      birdAuthor
      postText
      datePosted
      comments {
         commentText
         commentAuthor
         createdAt
      }
    }
  }
`;

export const EDIT_BIRD_POST = gql`
  mutation editBirdPost
  ($birdName: String!, $birdId: ID!, $birdImage: String!,$birdAuthor: String!){
    editBirdPost(birdName: $birdName,birdId:$birdId,birdImage: $birdImage, birdAuthor: $birdAuthor) {
      birdName
      birdId
      birdImage
      birdAuthor
      datePosted
      comments {
         commentText
         commentAuthor
         createdAt
      }
    }
  }
`;

export const DELETE_BIRD_POST =gql`
  mutation deleteBirdPost
  ($birdName: String!, $birdId: ID!, $birdImage: String!,$birdAuthor: String!){
    deleteBirdPost(birdName: $birdName,birdId:$birdId,birdImage: $birdImage, birdAuthor: $birdAuthor) {
      birdName
      birdId
      birdImage
      birdAuthor
      datePosted
      comments {
         commentText
         commentAuthor
         createdAt
      }
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