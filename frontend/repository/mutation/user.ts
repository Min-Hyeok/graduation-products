import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($input: CreateUserInput!) {
        signUp(createUserInput: $input) {
            __typename
        }
    }
`;

export const SIGN_IN = gql`
    mutation SignIn($input: LoginUserInput!) {
        signIn(loginUserInput: $input) {
            access_token
        }
    }
`;
