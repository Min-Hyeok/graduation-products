import { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';
import theme from '@styles/theme';
import { setTheme } from '@store/modules/settingSlice';
import { useEffect } from 'react';
import AppHeader from '@components/AppHeader';
import 'react-loading-skeleton/dist/skeleton.css';

const Wrapper = styled.div`
  padding-top: var(--header-height);
`;

const Application = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const state = store.getState();

  const setDarkModeTheme = () => {
    const isDarkMode = window.matchMedia && window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // 다크모드는 나중에 시간나면 하는걸로
    if (isDarkMode) store.dispatch(setTheme('light'));
  };

  useEffect(() => {
    setDarkModeTheme();
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme[state.setting.theme]}>
        <AppHeader />
        <GlobalStyle />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default Application;
