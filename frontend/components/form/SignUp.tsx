import useInput from '@hooks/useInput';
import styled from 'styled-components';
import Title from '@components/form/Title';
import TextField from '@components/TextField';
import Button from '@components/Button';

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

const SignUp = () => {
  const id = useInput('');
  const password = useInput('');
  const nickname = useInput('');
  const email = useInput('');

  return (
    <Wrapper>
      <Title text="개냥이에 오신것을 환영합니다" />
      <Form>
        <p>아이디</p>
        <TextField {...id} placeholder="아이디" />
      </Form>
      <Form>
        <p>비밀번호</p>
        <TextField {...password} type="password" placeholder="비밀번호" description="영문 대소문자 및 숫자 포함 8자리 이상" />
      </Form>
      <Form>
        <p>닉네임</p>
        <TextField {...nickname} placeholder="닉네임" />
      </Form>
      <Form>
        <p>이메일</p>
        <TextField {...email} placeholder="이메일" description="user@email.com" />
      </Form>
      <ButtonWrap>
        <Button title="회원가입" />
      </ButtonWrap>
    </Wrapper>
  );
};

export default SignUp;
