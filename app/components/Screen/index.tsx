import { CONSTANTS } from 'app/utils';
import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Column, ElementPropsType } from '../UI/View';

interface IScreen extends ElementPropsType, SafeAreaViewProps {
  children: React.ReactNode;
  fixedHeight: boolean;
  withSafeArea: boolean;
}

const Screen = ({ fixedHeight, withSafeArea, ...rest }: IScreen) => {
  return (
    <Column
      as={withSafeArea ? SafeAreaView : Column}
      bg={'#fafafa'}
      stretch
      {...rest}
      minHeight={fixedHeight ? CONSTANTS.HEIGHT : 'auto'}
      height={fixedHeight ? CONSTANTS.HEIGHT : 'auto'}
    ></Column>
  );
};

Screen.defaultProps = {
  fixedHeight: true,
  withSafeArea: true,
};

export default Screen;
