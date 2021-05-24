import styled from 'styled-components/native';
import { Column } from '../View';

export const Item = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  margin: 8px;
`;

export const Dot = styled(Column)<{ light: boolean; active: boolean }>`
  background-color: ${({ light, active, theme }) =>
    active ? 'transparent' : light ? theme.colors.light : theme.colors.grey};

  border-color: ${({ active, theme }) =>
    active ? theme.colors.orange : 'transparent'};
  border-width: 1px;
`;

export const PaginationContainer = styled(Column)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
`;
export const PaginationWrapper = styled(Column)`
  border-radius: 12px;
`;
