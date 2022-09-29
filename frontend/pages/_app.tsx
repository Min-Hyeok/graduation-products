import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';
import theme from '@styles/theme';
import { setTheme } from '@store/modules/settingSlice';
import { useEffect } from 'react';
import AppHeader from '@components/AppHeader';

const Application = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const state = store.getState();

  const setDarkModeTheme = () => {
    const isDarkMode = window.matchMedia && window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (isDarkMode) store.dispatch(setTheme('dark'));
  };

  useEffect(() => {
    setDarkModeTheme();
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme[state.setting.theme]}>
        <AppHeader />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default Application;
