import { gql } from "@apollo/client";

export const CREATE_TYPESERVICE = gql`
  mutation CREATE_TYPESERVICE($desc: String!, $imageUrl: String!) {
    createTypeservice(desc: $desc, imageUrl: $imageUrl) {
      id
      desc
      imageUrl
      createdAt
    }
  }
`;
