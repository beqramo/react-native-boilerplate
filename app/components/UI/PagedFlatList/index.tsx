import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, FlatList, FlatListProps } from 'react-native';

import { Container, Styles } from './styles';

interface IPagedFlatListPropsType extends FlatListProps<any> {
  data: any[];
  centerContent?: boolean;
  stretch?: boolean;
  initialScrollIndex?: number;
  keyExtractor: (val: any) => string;
  onIndexChange?: (index: number) => void;
  renderItem: ({ item: any, index: number }) => React.ReactElement<any, string>;
}

const PagedFlatList = forwardRef<FlatList<any>, IPagedFlatListPropsType>(
  (
    {
      data,
      centerContent,
      keyExtractor,
      onIndexChange,
      renderItem,
      initialScrollIndex,
      stretch,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<FlatList<any>>(null);
    const [dimensions, setDimensions] = useState<null | number>(null);

    useImperativeHandle(
      ref,
      (): any => ({
        scrollToIndex: (params: any) => {
          innerRef?.current?.scrollToIndex(params);
        },
      }),
      [],
    );

    const handleViewableItemsChanged = useCallback(
      (change) => {
        const { index } =
          change.viewableItems.find((item) => item.isViewable) ?? {};

        onIndexChange?.(+index);
      },
      [onIndexChange],
    );

    const onLayout = useCallback(
      (event) => {
        const width =
          event?.nativeEvent?.layout?.width || Dimensions.get('window').width;
        setDimensions(width);
      },
      [setDimensions],
    );

    return (
      <Container
        justifyCenter
        width={'100%'}
        onLayout={onLayout}
        stretch={stretch}
      >
        {!!dimensions && (
          <FlatList
            centerContent={centerContent}
            contentContainerStyle={
              centerContent ? Styles.contentContainerCenterStyle : undefined
            }
            data={data}
            getItemLayout={(_, index) => ({
              length: dimensions,
              offset: (dimensions ?? 0) * index,
              index,
            })}
            initialNumToRender={initialScrollIndex ?? 0 + 1}
            initialScrollIndex={initialScrollIndex}
            keyExtractor={keyExtractor}
            ref={innerRef}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal
            bounces
            horizontal
            pagingEnabled
            keyboardShouldPersistTaps={'always'}
            viewabilityConfig={{
              waitForInteraction: true,
              itemVisiblePercentThreshold: 1,
            }}
            onViewableItemsChanged={handleViewableItemsChanged}
            {...rest}
          />
        )}
      </Container>
    );
  },
);

PagedFlatList.defaultProps = {
  data: [],
  centerContent: false,
  stretch: true,
  initialScrollIndex: 0,
};

export default PagedFlatList;
