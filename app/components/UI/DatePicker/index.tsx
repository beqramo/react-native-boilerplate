import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { TextInputProps, TextInput, TouchableOpacity } from 'react-native';
import { BorderProps, SpaceProps } from 'styled-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

import { useTheme } from 'app/utils';

import Text from '../Text';
import { Column, ElementPropsType } from '../View';

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
  name: string;
  formState: any;
  renderRight?: React.ReactNode;
  renderLeft?: React.ReactNode;
  renderLabel?: React.ReactNode;
}

const DatePickerCustom = forwardRef<TextInput, ITextInputCustomPropsType>(
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
      onChangeText,
      value,
      ...rest
    },
    ref,
  ) => {
    const { formState } = rest;

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useTheme();

    const error = useMemo(() => formState?.errors?.[name]?.message, [
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
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = useCallback(
      (date: Date) => {
        console.log('A date has been picked: ', date, value);
        onChangeText?.(dayjs(date).format('MM/DD/YYYY'));

        hideDatePicker();
      },
      [onChangeText, value],
    );

    return useMemo(
      () => (
        <Container width={'100%'} {...containerProps}>
          {renderLabel ?? (
            <Text mb={2} textAlign={'left'} fontSize={2}>
              {label ?? name ?? ''}
            </Text>
          )}
          <TouchableOpacity onPress={showDatePicker}>
            <Column pointerEvents={'none'}>
              <TextInputStyled
                placeholder={placeholder ?? label ?? name ?? 'Type ...'}
                borderWidth={1}
                borderColor={borderColor}
                pl={renderLeft ? 10 : 6}
                pr={renderRight ? 10 : 6}
                placeholderTextColor={colors.placeholder}
                {...rest}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocusLocal}
                onBlur={onBlurLocal}
                ref={ref}
              />
            </Column>
          </TouchableOpacity>

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
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Container>
      ),
      [
        containerProps,
        renderLabel,
        label,
        name,
        placeholder,
        borderColor,
        renderLeft,
        renderRight,
        colors.placeholder,
        rest,
        value,
        onChangeText,
        onFocusLocal,
        onBlurLocal,
        ref,
        error,
        isDatePickerVisible,
        handleConfirm,
      ],
    );
  },
);

export default DatePickerCustom;
