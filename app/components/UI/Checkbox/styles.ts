import styled from 'styled-components/native';

import { Column } from '../View';

export const Container = styled(Column)`
  position: relative;
  z-index: 111;
  width: 100%;
`;

export const Box = styled(Column)`
  border-radius: 5px;
  border-width: 1px;
`;
