import React, {
  forwardRef, ReactElement, Ref, useImperativeHandle, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { IoMdClose } from 'react-icons/io';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation: popup 0.3s ease-in-out;

  > div {
    position: absolute;
    width: 550px;
    min-height: 300px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--white-color);
    border-radius: 10px;
    box-sizing: border-box;
    animation: popupContent 0.3s ease-in-out;
  }
`;

const PopupHeader = styled.div`
  height: 65px;
  box-shadow: var(--shadow-color);
  text-align: center;
  line-height: 65px;
  font-size: 18px;
  font-weight: 500;
  position: relative;

  > button {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    cursor: pointer;
  }
`;

const PopupContent = styled.div`
`;

export interface PopupType {
  readonly title: string;
  readonly content: ReactElement;
}

export interface PopupRefObject {
  open: ({ title, content }: PopupType) => void;
}

const Popup = (props: null, ref: Ref<PopupRefObject>) => {
  const popupContentRef = useRef(null);
  const [state, setState] = useState({
    popup: false,
    title: '',
    content: <div />,
  });

  const openPopup = ({ content, title }: PopupType) => {
    setState({
      popup: true,
      title,
      content,
    });
  };

  const closePopup = () => {
    setState({
      popup: false,
      title: '',
      content: <div />,
    });
  };

  useImperativeHandle(ref, () => ({
    open: openPopup,
  }));

  useOnClickOutside(popupContentRef, closePopup);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {state.popup && (
        <Wrapper>
          <div ref={popupContentRef}>
            <PopupHeader>
              <p>{state.title}</p>
              <button type="button" onClick={closePopup}>
                <IoMdClose />
              </button>
            </PopupHeader>
            <PopupContent>
              {state.content}
            </PopupContent>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default forwardRef(Popup);
