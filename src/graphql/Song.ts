import { gql } from "@apollo/client";


export const QUERY_SONGS = gql`
 query {
    songs{
      id
      name
      alblum
      artist
      genre
      imageUrl
      fileUrl
    }
  }
`;