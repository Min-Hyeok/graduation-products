import styled from 'styled-components';
import Title from '@components/form/Title';
import TextField from '@components/TextField';
import Button from '@components/Button';
import useInput from '@hooks/useInput';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@repository/mutation/user';
import useParseError from '@hooks/useParseError';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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

interface SignUpProps {
  close: () => void;
}

const SignUp = ({ close }: SignUpProps) => {
  const userId = useInput('');
  const password = useInput('');
  const userName = useInput('');
  const phoneNumber = useInput('');
  const [signUp, { error }] = useMutation(SIGN_UP);

  const submitUserInfo = async () => {
    await signUp({
      variables: {
        input: {
          userId: userId.value,
          password: password.value,
          userName: userName.value,
          phoneNumber: phoneNumber.value,
        },
      },
    });

    toast('회원가입이 완료되었습니다.');
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
        <TextField {...password} type="password" placeholder="비밀번호" description="영문 대소문자 및 숫자 포함 8자리 이상" />
      </Form>
      <Form>
        <p>이름</p>
        <TextField {...userName} placeholder="이름" />
      </Form>
      <Form>
        <p>휴대폰 번호</p>
        <TextField {...phoneNumber} placeholder="휴대폰 번호" description="010-1234-5678" />
      </Form>
      <ButtonWrap>
        <Button onClick={submitUserInfo} type="button" text="회원가입" />
      </ButtonWrap>
    </Wrapper>
  );
};

export default SignUp;
