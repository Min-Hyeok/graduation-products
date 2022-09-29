import 'styled-components';

declare module 'styled-components' {
  export interface BaseTheme {
    colors: Readonly<Record<string, string>>;
    space: Readonly<Record<'xl' | 'lg' | 'md' | 'sm' | 'xs', string>>;
    breakpoint: Readonly<Record<'xl' | 'lg' | 'md' | 'sm' | 'xs', string>>;
  }
}
