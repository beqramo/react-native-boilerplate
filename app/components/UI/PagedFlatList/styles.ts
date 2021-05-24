import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Column } from '../View';

export const Styles = StyleSheet.create({
  contentContainerCenterStyle: {
    justifyContent: 'center',
  },
});

export const Container = styled(Column)`
  overflow: hidden;
  position: relative;
`;
