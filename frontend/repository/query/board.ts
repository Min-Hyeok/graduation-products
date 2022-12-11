import { gql } from '@apollo/client';

export const FIND_BOARD_ALL = gql`
    query FindBoardAll($page: Int!, $search: String!) {
        findBoardAll(page: $page, search: $search) {
            id
            writer
            subject
            somnail
            age
            price
            breeds
        }
    }
`;

export const FIND_BOARD_ONE = gql`
    query FindBoardOne($id: Int!) {
        findBoardOne(id: $id) {
            writer
            subject
            content
            age
            price
            breeds
            registerDate
            userIndex
        }
        findUserOne {
            id
        }
    }
`;
