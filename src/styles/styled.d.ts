import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      light: string;
      medium: string;
      regular: string;
      semiBold: string;
      bold: string;
      extraBold: string;
    };
    fontSizes: {
      small: number;
      regular: number;
      medium: number;
      large: number;
      xLarge: number;
      title: number;
    };
    colors: {
      white: string;
      text: string;
      darkGray: string;
      gray: string;
      lightGray: string;
      red: string;
      green: string;
      primary: string;
      secondary: string;
      secondary2: string;
      secondary3: string;
      background: string;
    };
  }
}
