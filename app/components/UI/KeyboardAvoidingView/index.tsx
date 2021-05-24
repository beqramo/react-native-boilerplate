import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';

import { Column, ElementPropsType } from '../View';

interface IKeyboardAvoidingViewPropsType
  extends ElementPropsType,
    KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

const KeyboardAvoidingView = ({
  style,
  behavior,
  ...rest
}: IKeyboardAvoidingViewPropsType) => {
  return (
    <Column
      as={RNKeyboardAvoidingView}
      style={{ flex: 1, ...style }}
      behavior={behavior ?? 'padding'}
      {...rest}
    />
  );
};

export default KeyboardAvoidingView;
