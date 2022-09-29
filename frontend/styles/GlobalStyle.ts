import { BaseTheme, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import font from '@styles/font';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${font}
  * {
    transition: color 0.3s ease-out;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :root {
    ${({ theme }: { theme: BaseTheme }) => `
      --background-color: ${theme.colors.background};
      --font-color: ${theme.colors.fontColor};
      --header-color: ${theme.colors.headerColor};
   `};
  }

  body {
    background-color: var(--background-color);
    color: var(--font-color);
    transition: background 0.3s ease-out;
  }
`;

export default GlobalStyle;
