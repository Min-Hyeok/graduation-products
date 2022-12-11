import { gql } from '@apollo/client';

export const GET_BOARD_ALL = gql`
    query FindBoardAll($page: Int!, $search: String!) {
        findBoardAll(page: $page, search: $search) {
            writer
            subject
            somnail
            age
            price
            breeds
        }
    }
`;
