import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      Light: string;
      Medium: string;
      regular: string;
      SemiBold: string;
      bold: string;
    };
    fontSizes: {
      small: number;
      regular: number;
      medium: number;
      large: number;
      xLarge: number;
      title: number;
    };
  }
}
