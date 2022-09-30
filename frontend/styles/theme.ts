import { BaseTheme } from 'styled-components';

const defaultTheme: BaseTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: '#0d47a1',
  },
  space: {
    xl: '32px',
    lg: '24px',
    md: '16px',
    sm: '8px',
    xs: '4px',
  },
  breakpoint: {
    xl: '1920px',
    lg: '1440px',
    md: '720px',
    sm: '480px',
    xs: '320px',
  },
};

const lightTheme: BaseTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#f9f9f9',
    font: '#030303',
    header: 'rgba(255, 255, 255, 0.98)',
  },
  space: defaultTheme.space,
  breakpoint: defaultTheme.breakpoint,
};

const darkTheme: BaseTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#181818',
    font: '#ffffff',
    header: '#202020',
  },
  space: defaultTheme.space,
  breakpoint: defaultTheme.breakpoint,
};

export default {
  light: lightTheme,
  dark: darkTheme,
};
