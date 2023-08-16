import {gql} from '@apollo/client';

export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        birdPost {
            _id
            birdName
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
}`
//I tested this query in Apollo Sandbox and it works
export const GET_BIRD_POSTS = gql`
query birds {
    birds {
        _id
        birdId
        birdName
        birdAuthor
        birdImage
        createdAt
        comments {
            commentText
            commentAuthor
            createdAt
        } 
    }
}`

export const GET_SINGLE_BIRD = gql`
query bird($birdId: Int!){
    bird(birdId: $birdId){
        _id
        birdName
        birdImage
        birdAuthor
        datePosted
        comments {
            commentText
            commentAuthor
            createdAt
        }
    }
}`

export const SEARCH_BIRDS = gql`
query BirdSearch($query: String!) {
    birdSearch(query: $query) {
      birdId
      birdImage
      birdName
    }
  }
`
