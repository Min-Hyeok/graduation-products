import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin: 8px 0 24px;
`;

interface TitleType {
  text: string;
}

const Title = ({ text }: TitleType) => (
  <Wrapper>{text}</Wrapper>
);

export default Title;
