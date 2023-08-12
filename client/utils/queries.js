import {gql} from '@apollo/client';

export const GET_USER = gql`
query GetUser($userId: ID!) {
    user(id: $userId) {
        _id
        username
        email
    }
}`

export const GET_BIRDS = gql`
query GetBirds {
    birds {
        _id
        description
        birdId
    }
}`

export const GET_COMMENTS = gql`
query GetComments {
    comments {
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
}`