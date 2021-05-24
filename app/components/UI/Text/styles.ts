import styled from 'styled-components/native';
import { typography, TypographyProps, color, ColorProps } from 'styled-system';

import { Column } from '../View';

export const Text = styled(Column)<TypographyProps & ColorProps>`
  ${typography}
  ${color}
`;
