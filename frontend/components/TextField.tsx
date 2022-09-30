import styled from 'styled-components';
import { InputHTMLAttributes, ReactElement } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  > input {
    border-radius: 20px;
    padding: var(--sm-space) var(--md-space);
    border: none;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px;
  }

  > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: var(--sm-space);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white-color);
    background-color: var(--primary-color);
    cursor: pointer;

    > svg {
      width: 70%;
      height: 70%;
    }
  }
`;

interface TextFieldType extends InputHTMLAttributes<HTMLInputElement> {
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: ReactElement;
}

const TextField = ({
  value, onChange, icon, ...props
}: TextFieldType) => (
  <Wrapper>
    <input
      type="text"
      name="text field"
      {...props}
      value={value}
      onChange={onChange}
    />
    {icon && (
      <div>
        {icon}
      </div>
    )}
  </Wrapper>
);

export default TextField;
