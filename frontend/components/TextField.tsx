import styled from 'styled-components';
import {
  ChangeEvent, InputHTMLAttributes, useRef, useState,
} from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const Wrapper = styled.div`
  display: flex;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  > button {
    :nth-of-type(1) {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateX(-10%) translateY(-50%);
      color: var(--gray-color);
      font-size: 16px;
      transition: 0.2s all;
      padding: 0 5px;
      box-sizing: content-box;
      cursor: text;

      &.active {
        font-size: 12px;
        transform: translateX(-10%) translateY(-180%);
        background-color: var(--white-color);
      }
    }

    :nth-of-type(2) {
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
  }

  > input {
    width: 100%;
    border-radius: 20px;
    padding: 13.5px 30px 13.5px 15px;
    border: none;
    box-shadow: var(--shadow-color);
    background-color: var(--white-color);
  }
`;

const IconArea = styled.div`
  min-width: 42px;
  height: 42px;
  line-height: calc(60% + 44px);
  border-radius: 50%;
  margin-left: 8px;
  text-align: center;
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
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  search?: boolean;
  description?: string;
}

const TextField = ({
  value, onChange, reset, search, description, ...props
}: TextFieldType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showClear, setShowClear] = useState(false);
  const [focus, setFocus] = useState(false);

  const clearInput = () => {
    reset?.();

    setShowClear(false);
    setFocus(false);
  };

  const customOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (!inputRef?.current?.value.length) {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  };

  const customOnFocus = (e: ChangeEvent<HTMLInputElement>) => {
    setFocus(true);

    props?.onFocus?.(e);
  };

  const customOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef?.current?.value.length) {
      setFocus(false);
    }

    props?.onBlur?.(e);
  };

  const focusInput = () => {
    inputRef?.current?.focus();
    setFocus(true);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <button
          tabIndex="-1"
          type="button"
          onClick={focusInput}
          className={focus ? 'active' : ''}
        >
          {props?.placeholder}
        </button>
        <input
          ref={inputRef}
          type="text"
          name="text field"
          {...props}
          placeholder={focus ? description : ''}
          value={value}
          onChange={customOnChange}
          onFocus={customOnFocus}
          onBlur={customOnBlur}
        />
        {showClear && (
          <button type="button" onClick={clearInput}>
            <IoMdClose />
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
