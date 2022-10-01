import { BaseTheme, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import font from '@styles/font';
import animation from '@styles/animation';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${font}
  ${animation}
  * {
    transition: color 0.3s ease-out;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background-color: inherit;
    border: inherit;
    padding: 0;
    cursor: pointer;
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
    font-family: 'NotoSansKR', sans-serif;
    font-weight: 300;
  }
`;

export default GlobalStyle;
