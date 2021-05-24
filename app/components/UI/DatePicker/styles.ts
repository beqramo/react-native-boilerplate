import { TextInput } from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';
import styled, { css } from 'styled-components/native';
import { border, BorderProps, space, SpaceProps } from 'styled-system';

import { Column } from '../View';
import Text from '../Text';

export const Container = styled(Column)`
  overflow: hidden;
  position: relative;
`;
export const Error = styled(Text)`
  position: absolute;
  bottom: 4px;
  text-transform: capitalize;
`;

const styles = css<BorderProps & SpaceProps>`
  height: 54px;
  min-height: 54px;
  width: 100%;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.dark};
  ${border};
  ${space};
`;

export const TextInputStyled = styled(TextInput)<BorderProps & SpaceProps>`
  ${styles}
`;

export const RightSideContainer = styled(Column)`
  position: absolute;
  height: 54px;
  min-height: 54px;
  right: 0;
  bottom: 0;
`;
export const LeftSideContainer = styled(Column)`
  position: absolute;
  height: 54px;
  min-height: 54px;
  left: 0;
  bottom: 0;
`;
