import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
    mutation CreateBoard($input: CreateBoardInput!) {
        createBoard(createBoardInput: $input) {
            id
        }
    }
`;
