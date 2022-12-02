import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  background-color: var(--primary-color);
  color: var(--white-color);
  position: relative;
  border-radius: 25px;
  overflow: hidden;

  > button {
    width: 100%;
    height: 100%;
    font-size: 15px;
  }
`;

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
}

const Button = ({
  text,
  color,
  ...props
}: ButtonType) => (
  <Wrapper color={color}>
    <button onClick={props?.onClick} type="button">{text}</button>
  </Wrapper>
);
export default Button;
