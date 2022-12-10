import styled from 'styled-components';
import Title from '@components/form/Title';
import TextField from '@components/TextField';
import Button from '@components/Button';
import useInput from '@hooks/useInput';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@repository/mutation/user';
import useParseError from '@hooks/useParseError';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { setLogin } from '@store/modules/rootSlice';
import { useAppDispatch } from '@store/hooks';

const Wrapper = styled.div`
  padding: 24px;
`;

const Form = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;

  :not(:first-child) {
    margin-top: 15px;
  }

  > div {
    width: 100%;

    input {
      width: 100%;
    }
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin-top: 15px;
`;

interface SignInProps {
  close: () => void;
}

const SignIn = ({ close }: SignInProps) => {
  const userId = useInput('');
  const password = useInput('');
  const [signIn, { error }] = useMutation(SIGN_IN);
  const dispatch = useAppDispatch();

  const submitUserInfo = async () => {
    const response = await signIn({
      variables: {
        input: {
          userId: userId.value,
          password: password.value,
        },
      },
    });

    const accessToken = response.data.signIn.access_token;
    localStorage.setItem('token', accessToken);

    toast('로그인 되었습니다.');
    dispatch(setLogin(true));
    close();
  };

  useEffect(() => {
    if (error) {
      useParseError(error);
    }
  }, [error]);

  return (
    <Wrapper>
      <Title text="개냥이에 오신것을 환영합니다" />
      <Form>
        <p>이메일</p>
        <TextField {...userId} placeholder="이메일" description="user@email.com" />
      </Form>
      <Form>
        <p>비밀번호</p>
        <TextField {...password} type="password" placeholder="비밀번호" />
      </Form>
      <ButtonWrap>
        <Button onClick={submitUserInfo} type="button" text="로그인" />
      </ButtonWrap>
    </Wrapper>
  );
};

export default SignIn;
