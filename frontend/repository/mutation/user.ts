import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($input: CreateUserInput!) {
        signUp(createUserInput: $input) {
            __typename
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
