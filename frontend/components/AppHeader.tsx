import styled from 'styled-components';
// import PageLogo from '@assets/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import TextField from '@components/TextField';
import useInput from '@hooks/useInput';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TbUserCircle } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import Popup, { PopupRefObject } from '@components/Popup';
import SignUp from '@components/form/SignUp';
import SignIn from '@components/form/SignIn';
import { setLogin } from '@store/modules/rootSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: var(--header-height);
  box-shadow: var(--shadow-color);
  background-color: var(--header-color);
  transition: background 0.3s ease-out;
  z-index: 100;
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

  > p {
    margin-left: 16px;
  }
`;

const SearchArea = styled.div`
  text-align: center;
  min-width: 350px;
`;

const UserInfo = styled.div`
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-color);
  padding: 5px 10px;
  cursor: pointer;
  position: relative;

  > svg {
    :nth-of-type(1) {
      font-size: 18px;
    }

    :nth-of-type(2) {
      font-size: 34px;
      margin-left: 10px;
    }
  }

  > div {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(120%);
    width: 180px;
    background-color: var(--white-color);
    padding: 5px 0;
    margin: 5px 0;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    box-sizing: border-box;
    overflow: hidden;

    > button {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      transition: background 0.5s;
      padding: 0 20px;
      font-size: 15px;

      &.bold {
        font-weight: bold;
      }

      :hover {
        background-color: var(--hover-color);
      }
    }
  }
`;

const AppHeader = () => {
  const menuRef = useRef(null);
  const searchText = useInput('');
  const popupRef = useRef<PopupRefObject>(null);
  const [showMenu, setShowMenu] = useState(false);
  const isLogin = useAppSelector((state) => state.root.isLogin);
  const dispatch = useAppDispatch();

  const showUserMenu = () => {
    setShowMenu(true);
  };

  const hideUserMenu = () => {
    setShowMenu(false);
  };

  const openRegisterPopup = () => {
    if (popupRef.current) {
      popupRef.current.open({
        title: '회원가입',
        content: <SignUp close={popupRef.current.close} />,
      });
    }
  };

  const openSignInPopup = () => {
    if (popupRef.current) {
      popupRef.current.open({
        title: '로그인',
        content: <SignIn close={popupRef.current.close} />,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setLogin(false));

    toast('로그아웃 되었습니다.');
  };

  useOnClickOutside(menuRef, hideUserMenu);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLogin(true));
    }
  }, []);

  return (
    <Wrapper>
      <Popup ref={popupRef} />
      <Header>
        <Link href="/">
          <Logo>
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <p>개냥이</p>
          </Logo>
        </Link>
        <SearchArea>
          <TextField {...searchText} name="search" placeholder="검색" description="먼치킨" search />
        </SearchArea>
        <UserInfo ref={menuRef} onClick={showUserMenu}>
          <GiHamburgerMenu />
          <TbUserCircle />
          {showMenu && isLogin && (
            <div>
              <button type="button" className="bold" onClick={logout}>로그아웃</button>
            </div>
          )}
          {showMenu && !isLogin && (
            <div>
              <button type="button" className="bold" onClick={openRegisterPopup}>회원가입</button>
              <button type="button" onClick={openSignInPopup}>로그인</button>
            </div>
          )}
        </UserInfo>
      </Header>
    </Wrapper>
  );
};

export default AppHeader;
