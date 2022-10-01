import type { NextPage } from 'next';
import useFakeAnimalList from '@hooks/useFakeAnimalList';
import Card from '@components/Card';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
// import { useAppSelector } from '@store/hooks';

// const theme = useAppSelector((state) => state.setting.theme);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <Wrapper>
      {list.map((item) => (
        <Card
          item={item}
          key={item.index}
          loading={loading}
        />
      ))}
    </Wrapper>
  );
};
export default Home;
