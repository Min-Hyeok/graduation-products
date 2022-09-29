interface BaseTheme {
  colors: Readonly<Record<string, string>>;
  space: Readonly<Record<'xl' | 'lg' | 'md' | 'sm' | 'xs', string>>;
}

const defaultTheme: BaseTheme = {
  colors: {
    white: '#fff',
    black: '#000'
  },
  space: {
    xl: '30px',
    lg: '20px',
    md: '16px',
    sm: '8px',
    xs: '4px'
  }
};

const lightTheme: BaseTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#f9f9f9'
  },
  space: defaultTheme.space
};

const darkTheme: BaseTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#181818'
  },
  space: defaultTheme.space
};

export default {
  light: lightTheme,
  dark: darkTheme
};
