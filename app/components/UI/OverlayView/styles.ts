import styled from 'styled-components/native';
import { color, ColorProps } from 'styled-system';

import Animated from 'react-native-reanimated';

import { Column } from '../View';

export const Container = styled(Column)`
  position: relative;
  z-index: 111;
  width: 100%;
`;

export const ProgressView = styled(Animated.View)<ColorProps>`
  height: 1px;
  ${color}
`;
