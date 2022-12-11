import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
    mutation CreateBoard($input: CreateBoardInput!) {
        createBoard(createBoardInput: $input) {
            id
        }
    }
`;

export const DELETE_BOARD = gql`
    mutation RemoveBoard($id: Int!) {
        removeBoard(id: $id) {
            __typename
        }
    }
`;
