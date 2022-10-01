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

  button {
    background-color: inherit;
    border: inherit;
    padding: 0;
  }

  input {
    outline: none;
  }

  :root {
    ${({ theme }: { theme: BaseTheme }) => `
      --xl-space: ${theme.space.xl};
      --lg-space: ${theme.space.lg};
      --md-space: ${theme.space.md};
      --sm-space: ${theme.space.sm};
      --xs-space: ${theme.space.xs};

      --xl-breakpoint: ${theme.breakpoint.xl};
      --lg-breakpoint: ${theme.breakpoint.lg};
      --md-breakpoint: ${theme.breakpoint.md};
      --sm-breakpoint: ${theme.breakpoint.sm};
      --xs-breakpoint: ${theme.breakpoint.xs};

      --header-height: 80px;

      ${Object.keys(theme.colors).map((key) => `--${key}-color: ${theme.colors[key]};`).join('')}
   `};
  }

  body {
    background-color: var(--background-color);
    color: var(--font-color);
    transition: background 0.3s ease-out;
  }
`;

export default GlobalStyle;
