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
//Tested this mutation in Apollo Sandbox and it works!
export const ADD_BIRD_POST = gql`
  mutation addBird($birdName: String!, $birdId: Int!, $birdImage: String!,$birdAuthor: String!){
    addBird(birdName: $birdName,birdId:$birdId,birdImage: $birdImage, birdAuthor: $birdAuthor) {
      birdName
      birdId
      birdImage
      birdAuthor
      createdAt
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
      createdAt
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
//Tested this mutation in Apollo Sandbox and it works!
export const ADD_COMMENT = gql`
mutation addComment($birdId: ID!, $commentText: String! $commentAuthor: String!) {
  addComment(birdId: $birdId, commentText: $commentText, commentAuthor: $commentAuthor ) {
      commentText
      commentAuthor
      createdAt
  }
}
`;

export const EDIT_COMMENT = gql`
  mutation editComment($birdId: ID!, $commentText: String! $commentAuthor: String!) {
    editComment(birdId: $birdId, commentText: $commentText, commentAuthor: $commentAuthor ) {
      commentText
      commentAuthor
      createdAt
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