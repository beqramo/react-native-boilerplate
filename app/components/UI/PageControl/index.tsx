import React from 'react';

import { ElementPropsType, Row } from '../View';

import { Dot, Item, PaginationContainer, PaginationWrapper } from './styles';

type PageControlPropsType = {
  light: boolean;
  activeIndex: number;
  count: number;
  onItemPress?: (index: number) => void;
} & ElementPropsType;

function PageControl({
  activeIndex,
  count,
  onItemPress,
  light,
  ...rest
}: PageControlPropsType) {
  return (
    <PaginationContainer {...rest}>
      <PaginationWrapper px={2} py={1}>
        <Row>
          {Array(count)
            .fill('', 0)
            .map((_, index) => (
              <Item
                key={index}
                onPress={() => {
                  onItemPress?.(index);
                }}
              >
                <Dot
                  active={index === activeIndex}
                  light={light}
                  size={index === activeIndex ? '12px' : '8px'}
                  borderRadius={index === activeIndex ? '6px' : '4px'}
                />
              </Item>
            ))}
        </Row>
      </PaginationWrapper>
    </PaginationContainer>
  );
}

PageControl.defaultProps = {
  activeIndex: 0,
  light: true,
};

export default PageControl;
