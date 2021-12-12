import { gql } from "@apollo/client";

//Admin Management User
//Query from database
export const MY_INFO = gql`
  query {
    myInfo {
      id
      username
      email
      images
      covers
      roles
      createdAt
    }
  }
`;

export const MY_SCREAMS = gql`
  query {
    myInfo {
      username
      images
      screams {
        id
        description
        imageUrl
        status
        shares
        likes
        comments {
          id
          description
          user {
            id
            username
            images
          }
          recomments {
            id
            description
            user {
              id
              username
              images
            }
          }
        }
      }
    }
  }
`;

//Management my Owner information
export const QUERY_MYPROFILE = gql`
  query {
    myprofile {
      id
      firstname
      lastname
      bios
      gender
      age
      birthdate
      mentalStatus
    }
  }
`;
//Admin & Super Admin query User
export const QUERY_USERS = gql`
  query {
    users {
      id
      username
      email
      images
      covers
      roles
      createdAt
    }
  }
`;

//Mutaion
export const SIGN_UP = gql`
  mutation SIGN_UP($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
      username
      email
      images
      covers
      roles
      createdAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SIGN_IN($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      username
      email
      images
      covers
      roles
      createdAt
    }
  }
`;

export const SIGN_OUT = gql`
  mutation {
    signOut {
      message
    }
  }
`;

export const REQUEST_TO_RESET_PASSWORD = gql`
  mutation REQUEST_TO_RESET_PASSWORD($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $token: String!
    $password: String!
    $confirmpassword: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      confirmpassword: $confirmpassword
    ) {
      message
    }
  }
`;

export const UPDATE_ROLES = gql`
  mutation UPDATE_ROLES($userId: String!, $newRoles: [String!]!) {
    updateRoles(userId: $userId, newRoles: $newRoles) {
      id
      username
      email
      roles
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($userId: String!) {
    deleteUser(userId: $userId) {
      message
    }
  }
`;
