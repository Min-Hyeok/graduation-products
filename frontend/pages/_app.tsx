import { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import { wrapper } from '@store/index';
import { Provider } from 'react-redux';
import theme from '@styles/theme';
import { setTheme } from '@store/modules/rootSlice';
import { useEffect } from 'react';
import AppHeader from '@components/AppHeader';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { setContext } from '@apollo/client/link/context';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  padding-top: var(--header-height);
`;

const App = ({ Component, ...rest }: AppProps) => {
  const {
    store,
    props,
  } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const state = store.getState();

  const setDarkModeTheme = () => {
    const isDarkMode = window.matchMedia && window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // 다크모드는 나중에 시간나면 하는걸로
    if (isDarkMode) store.dispatch(setTheme('light'));
  };

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/v1/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  useEffect(() => {
    setDarkModeTheme();

    if (process.env.NODE_ENV !== 'production') {
      window.addEventListener('error', (event) => {
        event.stopImmediatePropagation();
      });

      window.addEventListener('unhandledrejection', (event) => {
        event.stopImmediatePropagation();
      });
    }
  });

  return (
    <Provider store={store}>
      <Auth0Provider domain="localhost" clientId="">
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme[state.root.theme]}>
            <AppHeader />
            <GlobalStyle />
            <ToastContainer />
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </ThemeProvider>
        </ApolloProvider>
      </Auth0Provider>
    </Provider>
  );
};

export default App;
