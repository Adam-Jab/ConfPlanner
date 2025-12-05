import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      background: string;
      muted: string;
      border: string;
      card: string;
      primary: string;
      success: string;
      danger: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      pill: string;
    };
    spacing: (n: number) => string;
  }
}


