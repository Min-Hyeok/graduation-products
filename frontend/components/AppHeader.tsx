import styled from 'styled-components';
import PageLogo from '@assets/images/logo.png';
import Link from 'next/link';
import TextField from '@components/TextField';
import { BiSearch } from 'react-icons/bi';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 0;
  background-color: var(--header-color);
  transition: background 0.3s ease-out;
`;

const Header = styled.div`
  max-width: 1760px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--lg-space);
`;

const Logo = styled.div`
  font-size: 32px;
  font-family: 'RixInooAriDuriR', sans-serif;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  color: var(--primary-color);

  > img {
    max-width: 55px;
    padding-right: ${({ theme }) => theme.space.md};
  }
`;

const SearchArea = styled.div`
  text-align: center;
  min-width: 350px;
`;

const UserInfo = styled.div`

`;

const AppHeader = () => (
  <Wrapper>
    <Header>
      <Link href="/">
        <Logo>
          <img src={PageLogo} alt="" />
          개냥이
        </Logo>
      </Link>
      <SearchArea>
        <TextField icon={<BiSearch />} />
      </SearchArea>
      <UserInfo>로그인/로그아웃</UserInfo>
    </Header>
  </Wrapper>
);

export default AppHeader;
