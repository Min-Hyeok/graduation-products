import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { FIND_BOARD_ONE } from '@repository/query/board';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Button from '@components/Button';
import { DELETE_BOARD } from '@repository/mutation/board';
import { toast } from 'react-toastify';

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

const ButtonWrapper = styled.div`
  > div {
    max-width: 400px;
    margin: 0 auto;
    margin-top: var(--md-space);
    margin-bottom: 50px;
    display: flex;

    > div {
      margin: 0 5px;
    }
  }
`;

const View = () => {
  const router = useRouter();
  const contentRef = useRef();
  const { id } = router.query;
  const [isWriter, setIsWriter] = useState(false);
  const [removeBoard] = useMutation(DELETE_BOARD);
  const { data } = useQuery(FIND_BOARD_ONE, {
    variables: { id: Number(id) },
  });

  const deleteBoard = () => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return;

    removeBoard({
      variables: {
        id: Number(id),
      },
    });

    toast('삭제되었습니다.');
    router.push('/');
  };

  useEffect(() => {
    if (!data) return;

    contentRef.current.innerHTML = data.findBoardOne.content;
    if (!data.findUserOne.length) return;

    if (data.findUserOne[0].id === data.findBoardOne.userIndex) {
      setIsWriter(true);
    }
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
      <ButtonWrapper>
        {isWriter && (
          <div>
            <Button text="삭제" onClick={deleteBoard} />
          </div>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default View;
