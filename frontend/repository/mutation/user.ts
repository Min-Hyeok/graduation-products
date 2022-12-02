import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($createUserInput: createUserInput!) {
    signUp(createUserInput: createUserInput) {
      $createUserInput
    }
  }
`;

export const SIGN_IN = gql`
  mutation {
    signIn(loginUserInput: {
      userId: "alsgur0008"
      password: "alsgur123"
    }) {
      access_token
    }
  }
`;
