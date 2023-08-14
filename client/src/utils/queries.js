import {gql} from '@apollo/client';

export const GET_USER = gql`
query GetUser($userId: ID!) {
    user(id: $userId) {
        _id
        username
        email
    }
}`

export const GET_BIRD_POSTS = gql`
query GetBirdPosts {
    birds {
        _id
        description
        birdId
        birdAuthor
    }
}`

export const GET_SINGLE_BIRD = gql`
query getSingleBird($birdId: ID!){
    bird(birdId: $birdId){
        _id
        description
        birdId
        birdAuthor
        comments {
            _id
            text
            bird
            user
            datePosted
    }
}`
