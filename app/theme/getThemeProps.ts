import { style, getPx, compose } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

export const getColor = (key) => {
  return themeGet(`colors.${key}`);
};

export const getMetrics = (key) => {
  return themeGet(`metrics.${key}`);
};

export const getShadows = (key) => {
  return themeGet(`shadows.${key}`);
};

export const getSpace = (key) => {
  return themeGet(`space.${key}`);
};

export const getTypography = (key) => {
  return themeGet(`typography.${key}`);
};

export const getFontSize = (key) => {
  return themeGet(`fontSizes.${key}`);
};

export const getLineHeight = (key) => {
  return themeGet(`lineHeights.${key}`);
};

export const tintColor = style({
  prop: 'tintColor',
  key: 'colors',
});

export const shadowColor = style({
  prop: 'shadowColor',
  key: 'colors',
});

export const shadowOffset = style({
  prop: 'shadowOffset',
});

export const shadowRadius = style({
  prop: 'shadowRadius',
});

export const shadowOpacity = style({
  prop: 'shadowOpacity',
});

export const elevation = style({
  prop: 'elevation',
});

export const borderTopLeftRadius = style({
  prop: 'borderTopLeftRadius',
  key: 'radii',
  alias: 'btlr',
  transformValue: getPx,
});

export const borderTopRightRadius = style({
  prop: 'borderTopRightRadius',
  key: 'radii',
  alias: 'btrr',
  transformValue: getPx,
});

export const borderBottomRightRadius = style({
  prop: 'borderBottomRightRadius',
  key: 'radii',
  alias: 'bbrr',
  transformValue: getPx,
});

export const borderBottomLeftRadius = style({
  prop: 'borderBottomLeftRadius',
  key: 'radii',
  alias: 'bblr',
  transformValue: getPx,
});

export const borderCornerRadius = compose(
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
);

export const getThemeColor = ({ light, theme }) =>
  light ? theme.colors.backgroundLight : theme.colors.backgroundDark;
