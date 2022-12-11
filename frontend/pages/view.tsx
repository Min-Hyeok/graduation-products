import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { FIND_BOARD_ONE } from '@repository/query/board';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const Wrapper = styled.div`
  width: 1400px;
  margin: 0 auto;
  margin-top: var(--md-space);
  padding: 20px;

  > div > p {
    font-size: 24px;
    font-weight: bold;
    background-color: var(--white-color);
    display: inline-block;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
  }
`;

const Info = styled.div`
  margin-top: var(--md-space);
  font-size: 14px;
  line-height: 22px;
  border-radius: 10px;
  background-color: var(--white-color);
  padding: 20px;
`;

const Content = styled.div`
  background-color: var(--white-color);
  padding: 20px;
  margin-top: var(--md-space);
`;

const View = () => {
  const router = useRouter();
  const contentRef = useRef();
  const { id } = router.query;
  const { data } = useQuery(FIND_BOARD_ONE, {
    variables: { id: Number(id) },
  });

  useEffect(() => {
    if (!data) return;

    contentRef.current.innerHTML = data.findBoardOne.content;
  });

  return (
    <Wrapper>
      {data && (
        <div>
          <p>{data.findBoardOne.subject}</p>
          <Info>
            <p>
              {data.findBoardOne.breeds}
              {' '}
              /
              {' '}
              {data.findBoardOne.age}
              살
            </p>

            <p>
              {Intl.NumberFormat('ko-KR').format(data.findBoardOne.price)}
              원
            </p>
          </Info>
          <Content className="ProseMirror toastui-editor-contents" ref={contentRef} />
        </div>
      )}
    </Wrapper>
  );
};

export default View;
