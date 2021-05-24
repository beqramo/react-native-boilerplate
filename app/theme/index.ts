import mainTheme from './main';
import * as getThemeProps from './getThemeProps';

export { mainTheme, getThemeProps };

type CustomTheme = typeof mainTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
