import styled from 'styled-components/native';

import { Row } from 'app/components/UI';

export const Container = styled(Row)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const MiddleContainer = styled(Row)`
  position: relative;
  width: 100%;
`;

export const LeftContainer = styled(Row)`
  position: absolute;
  left: 0;
`;
export const RightContainer = styled(Row)`
  position: absolute;
  right: 0;
`;
