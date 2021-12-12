import { gql } from "@apollo/client";


export const CREATE_SCREAM = gql`
  mutation CREATE_SCREAM(
      $description: String!, 
      $imageUrl: String!, 
    ){
    createScream(
      description:  $description
      imageUrl: $imageUrl
    ){
      id
      imageUrl
      description
    }
  }
`;


export const QUERY_SCREAMS = gql`
  query {
    screams{
      id
      imageUrl
      description
      createdAt
      user{
        id
        username
        images
      }
    }
  }
`;