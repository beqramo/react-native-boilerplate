/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { CONSTANTS } from 'app/utils';

import { ElementPropsType } from '../View';
import ScrollView from '../ScrollView';

import { Container } from './styles';

type OverlayViewPropsType = {
  data: any[] | null;
  renderItem: (val: any, index: number) => React.ReactElement;
} & ElementPropsType;

function OverlayView({ data, renderItem, ...rest }: OverlayViewPropsType) {
  return data && data.length ? (
    <Container style={{ elevation: 11 }}>
      <ScrollView
        style={{ position: 'absolute', zIndex: 111 }}
        contentContainerStyle={{
          elevation: 111,
          zIndex: 11111,
        }}
        bg={'#EDEFF0'}
        width={'100%'}
        maxHeight={CONSTANTS.HEIGHT / 2.3}
        pb={5}
        {...rest}
      >
        {data?.map(renderItem)}
      </ScrollView>
    </Container>
  ) : null;
}

export default OverlayView;
