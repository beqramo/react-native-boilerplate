import React, { forwardRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { ElementPropsType, Column } from '../View';

// eslint-disable-next-line react/display-name
const index = forwardRef<
  ScrollView,
  ElementPropsType & ScrollViewProps & { children: React.ReactNode }
>(({ contentContainerStyle, ...props }, ref) => {
  return (
    <Column
      as={ScrollView}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        flex: 0,
        flexGrow: 1,
        ...((contentContainerStyle as object) ?? {}),
      }}
      keyboardShouldPersistTaps={'handled'}
      ref={ref}
      {...props}
    />
  );
});

export default index;
