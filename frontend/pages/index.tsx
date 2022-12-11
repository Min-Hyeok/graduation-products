import type { NextPage } from 'next';
import useFakeAnimalList from '@hooks/useFakeAnimalList';
import Card from '@components/Card';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { FIND_BOARD_ALL } from '@repository/query/board';
import { useEffect } from 'react';
import useParseError from '@hooks/useParseError';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: var(--md-space);
  max-width: var(--lg-breakpoint);
  padding: var(--md-space);
  margin: 0 auto;

  ${({ theme }) => `
    @media screen and (max-width: ${theme.breakpoint.lg}) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: ${theme.breakpoint.md}) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: ${theme.breakpoint.sm}) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: ${theme.breakpoint.xs}) {
      grid-template-columns: 1fr;
    }
  `}

`;

const Home: NextPage = () => {
  const list = useFakeAnimalList();
  const search = '';
  const page = 1;
  const { loading, error, data } = useQuery(FIND_BOARD_ALL, {
    variables: { search, page },
  });

  useEffect(() => {
    if (error) useParseError(error);
  }, [data, error]);

  return (
    <Wrapper>
      {loading && list.map((item: AnimalList, index: number) => (
        <Card
          item={item}
          key={index}
          loading={loading}
        />
      ))}
      {!loading && data.findBoardAll.map((item: AnimalList, index: number) => (
        <Card
          item={item}
          key={index}
          loading={loading}
        />
      ))}
    </Wrapper>
  );
};

export default Home;
