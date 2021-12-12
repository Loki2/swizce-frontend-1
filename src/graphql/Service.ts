import { gql } from "@apollo/client";


export const CREATE_SERVICE = gql`
  mutation CREATE_SERVICE(
    $name: String!,
    $description: String!,
    $address: String!,
    $contact: String!,
    $tags: String!,
    $imageUrl: String!
  ){
    createService(
      name: $name,
      description: $description,
      address: $address,
      contact: $contact,
      tags: $tags,
      imageUrl: $imageUrl
    ){
      id
      name
      description
      address
      contact
      tags
      imageUrl
    }
  }

`;


export const QUERY_SERVICE = gql`
  query {
      services{
        id
        name
        description
        contact
        address
        imageUrl
        status
        tags
        user{
          id
          username
        }
      }
    }
`;