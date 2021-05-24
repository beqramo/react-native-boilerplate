import React from 'react';
import { Text as ReactNativeText, TextProps } from 'react-native';
import { TypographyProps, ColorProps } from 'styled-system';

import theme from 'app/theme/main';

import { ElementPropsType } from '../View';

import { Text } from './styles';

export interface ITextProps
  extends ElementPropsType,
    TextProps,
    TypographyProps,
    ColorProps {
  children?: React.ReactNode;
  text?: string;
  color?: keyof typeof theme.colors.fontColors;
}

const getFont = (fontWeight: number) =>
  `Poppins-${
    fontWeight === 4
      ? 'Bold'
      : fontWeight === 3
      ? 'SemiBold'
      : fontWeight === 2
      ? 'Medium'
      : fontWeight === 1
      ? 'Regular'
      : 'Light'
  }`;

function TextComponent({
  text,
  children,
  color,
  fontWeight,
  fontFamily,
  ...rest
}: ITextProps) {
  // const i18nText = tx && translate(tx, txOptions);
  const content = text || children;

  return (
    <Text
      as={ReactNativeText}
      {...rest}
      fontFamily={
        typeof fontWeight === 'number' ? getFont(fontWeight) : fontFamily
      }
      fontWeight={fontWeight}
      color={`fontColors.${color}`}
      allowFontScaling={false}
    >
      {content}
    </Text>
  );
}

TextComponent.defaultProps = {
  fontFamily: 'Poppins-Regular',
  fontSize: 3,
  fontWeight: 1,
  color: 'dark',
  textAlign: 'center',
};

export default TextComponent;
