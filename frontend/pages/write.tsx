import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Wrapper = styled.div`
  width: 1200px;
  background-color: var(--white-color);
  margin: 0 auto;
  margin-top: var(--md-space);
  border-radius: 10px;
`;

const ToastEditor = dynamic(() => import('@components/ToastEditor'), {
  ssr: false,
});

const write = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(editorRef);
  }, [editorRef]);

  return (
    <Wrapper>
      <ToastEditor
        ref={editorRef}
        placeholder="글 내용을 입력해 주세요."
      />
    </Wrapper>
  );
};

export default write;
