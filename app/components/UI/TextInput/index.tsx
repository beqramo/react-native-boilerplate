import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { BorderProps, SpaceProps } from 'styled-system';

import { useTheme } from 'app/utils';

import { ElementPropsType } from '../View';
import Text from '../Text';

import {
  TextInputStyled,
  Container,
  Error,
  RightSideContainer,
  LeftSideContainer,
} from './styles';

export interface ITextInputCustomPropsType
  extends BorderProps,
    SpaceProps,
    TextInputProps {
  label?: string;
  containerProps?: ElementPropsType;
  error?: any;
  name?: string;
  formState?: any;
  renderRight?: React.ReactNode;
  renderLeft?: React.ReactNode;
  renderLabel?: React.ReactNode;
}

const TextInputCustom = forwardRef<TextInput, ITextInputCustomPropsType>(
  (
    {
      label,
      placeholder,
      containerProps,
      name,
      onFocus,
      onBlur,
      renderRight,
      renderLeft,
      renderLabel,
      ...rest
    },
    ref,
  ) => {
    const { formState } = rest;

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useTheme();

    const error = useMemo(() => formState?.errors?.[name ?? '']?.message, [
      formState,
      name,
    ]);

    const borderColor = useMemo(
      () => (isFocused && !error ? 'placeholder' : error ? 'red' : 'grey'),
      [isFocused, error],
    );

    const onFocusLocal = useCallback(
      (r) => {
        setIsFocused(true);
        onFocus?.(r);
      },
      [onFocus],
    );

    const onBlurLocal = useCallback(
      (e) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return useMemo(
      () => (
        <Container width={'100%'} {...containerProps}>
          {renderLabel ?? (
            <Text mb={2} textAlign={'left'} fontSize={2}>
              {label ?? name ?? ''}
            </Text>
          )}
          <TextInputStyled
            placeholder={placeholder ?? label ?? name ?? 'Type ...'}
            borderWidth={1}
            borderColor={borderColor}
            pl={renderLeft ? 10 : 6}
            pr={renderRight ? 10 : 6}
            placeholderTextColor={colors.placeholder}
            {...rest}
            onFocus={onFocusLocal}
            onBlur={onBlurLocal}
            ref={ref}
          />
          {!!error && (
            <Error color={'orange'} textAlign={'left'} fontSize={1} px={6}>
              {error}
            </Error>
          )}
          {!!renderLeft && (
            <LeftSideContainer pl={6} justifyCenter>
              {renderLeft}
            </LeftSideContainer>
          )}
          {!!renderRight && (
            <RightSideContainer pr={6} justifyCenter>
              {renderRight}
            </RightSideContainer>
          )}
        </Container>
      ),
      [
        containerProps,
        label,
        name,
        placeholder,
        borderColor,
        renderRight,
        colors.placeholder,
        rest,
        onFocusLocal,
        onBlurLocal,
        ref,
        error,
        renderLeft,
        renderLabel,
      ],
    );
  },
);

export default TextInputCustom;
