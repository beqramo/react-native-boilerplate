import React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import theme from 'app/theme/main';

import Text, { ITextProps } from '../Text';
import Image from '../Image';
import { ElementPropsType } from '../View';

import { Container, Touchable } from './styles';

const hitSlop = { bottom: 10, left: 10, top: 10, right: 10 };
interface IButtonProps
  extends ElementPropsType,
    Pick<ITextProps, 'fontSize' | 'fontWeight'> {
  text: string;
  buttonColor: string;
  type: 'default' | 'text' | 'icon';
  onPress: () => void;
  iconSource?: ImageSourcePropType;
  disabled?: boolean;
  textColor?: keyof typeof theme.colors.fontColors;
  withUnderline: boolean;
  withFullWidth?: boolean;
  withFullHeight?: boolean;
  tintColor?: string;
}

const Button = ({
  text,
  buttonColor,
  type,
  fontSize,
  fontWeight,
  onPress,
  iconSource,
  textColor,
  withUnderline,
  withFullWidth,
  withFullHeight,
  tintColor,
  ...rest
}: IButtonProps) => {
  return type === 'text' ? (
    <Touchable
      as={TouchableOpacity}
      hitSlop={hitSlop}
      {...rest}
      onPress={onPress}
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={textColor ?? 'orange'}
        style={{ textDecorationLine: withUnderline ? 'underline' : 'none' }}
      >
        {text}
      </Text>
    </Touchable>
  ) : type === 'icon' ? (
    <Touchable
      as={TouchableOpacity}
      hitSlop={hitSlop}
      {...rest}
      onPress={onPress}
    >
      <Image source={iconSource} tintColor={tintColor} />
    </Touchable>
  ) : (
    <Container mx={7} height={'60px'} {...rest}>
      <Touchable
        as={TouchableOpacity}
        hitSlop={hitSlop}
        bg={rest.disabled ? 'grey' : buttonColor}
        justifyCenter
        alignCenter
        width={withFullWidth ? '100%' : 'auto'}
        height={withFullHeight ? '100%' : 'auto'}
        borderRadius={4}
        onPress={onPress}
        disabled={rest.disabled}
      >
        {!!iconSource && (
          <Image source={iconSource} mr={3} tintColor={tintColor} />
        )}

        <Text
          fontSize={fontSize}
          color={textColor ?? 'light'}
          fontWeight={fontWeight}
        >
          {text}
        </Text>
      </Touchable>
    </Container>
  );
};

Button.defaultProps = {
  light: true,
  text: '',
  buttonColor: 'buttonColors.orange',
  type: 'default',
  fontSize: 4,
  fontWeight: 3,
  disabled: false,
  withUnderline: true,
  withFullWidth: true,
  withFullHeight: true,
  tintColor: undefined,
};

export default Button;
