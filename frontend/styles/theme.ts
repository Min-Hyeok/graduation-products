import { BaseTheme } from 'styled-components';

const defaultTheme: BaseTheme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: '#0d47a1',
    gray: '#ccc9c6',
    hover: '#f7f7f7',
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
    lg: '1600px',
    md: '1024px',
    sm: '720px',
    xs: '600px',
  },
};

const lightTheme: BaseTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#f9f9f9',
    font: '#030303',
    header: 'rgba(255, 255, 255, 0.98)',
    shadow: 'rgba(0, 0, 0, 0.02) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px',
    gray: '#6c6c6c',
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
