export const palette = {
  black: '#000000',
  white: '#ffffff',
  clear: 'rgba(0, 0, 0, 0)',
  backgroundGrey: '#0000001a',
  grey: '#E5E5E5',
  darkerGrey: '#16203A33',
  fontGrey: '#16203AB3',
  borderGrey: '#C4C4C4',
  orange: '#EF6767',
  error: '#E15656',
  yellow: '#FFD15A',
  green: '#41A966',
  blue: '#0075E9',
  dark: '#16203A',
  light: '#FFFFFF',
  placeholder: '#29252EB3',
};

export default {
  backgroundDark: palette.dark,
  backgroundLight: palette.light,
  fontColors: {
    grey: palette.fontGrey,
    light: palette.light,
    dark: palette.dark,
    orange: palette.orange,
    yellow: palette.yellow,
    green: palette.green,
    error: palette.error,
    blue: palette.blue,
  },
  buttonColors: {
    orange: palette.orange,
  },
  ...palette,
};
