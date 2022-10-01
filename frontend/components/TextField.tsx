import styled from 'styled-components';
import {
  ChangeEvent, InputHTMLAttributes, useRef, useState,
} from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  position: relative;

  > input {
    border-radius: 20px;
    padding: 10px 15px;
    border: none;
    box-shadow: var(--shadow-color);
    background-color: var(--white-color);
  }

  > button {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    > svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const IconArea = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white-color);
  background-color: var(--primary-color);
  cursor: pointer;

  > svg {
    width: 60%;
    height: 60%;
  }
`;

interface TextFieldType extends InputHTMLAttributes<HTMLInputElement> {
  reset?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  search?: boolean;
}

const TextField = ({
  value, onChange, reset, search, ...props
}: TextFieldType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showClear, setShowClear] = useState(false);

  const customOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (!inputRef?.current?.value.length) {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  };

  const clearInput = () => {
    reset?.();
    setShowClear(false);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <input
          ref={inputRef}
          type="text"
          name="text field"
          {...props}
          value={value}
          onChange={customOnChange}
        />
        {showClear && (
          <button type="button" onClick={clearInput}>
            <AiOutlineCloseCircle />
          </button>
        )}
      </InputWrapper>
      {search && (
        <IconArea>
          <BiSearch />
        </IconArea>
      )}
    </Wrapper>
  );
};

export default TextField;
