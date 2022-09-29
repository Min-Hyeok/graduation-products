import { BaseTheme, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    ${({ theme }: { theme: BaseTheme }) => `
      --background-color: ${theme.colors.background};
   `};
  }

  body {
    background-color: var(--background-color);
  }
`;

export default GlobalStyle;
