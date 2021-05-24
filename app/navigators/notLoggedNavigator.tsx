import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { notLoggedScreens } from 'app/screens';

import { ROUTES } from './routes';
import { Column } from 'app/components/UI';

export type NotLoggedParamList = {
  [ROUTES.introduction]: undefined;
};

const Stack = createStackNavigator<NotLoggedParamList>();

export function NotLoggedNavigator() {
  return (
    <Column bg={'blue'} stretch>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.introduction}
      >
        {Object.entries(notLoggedScreens).map(
          ([, { screen, ScreenComponent, ...rest }]) => (
            <Stack.Screen
              key={screen}
              name={screen}
              component={ScreenComponent}
              {...rest}
            />
          ),
        )}
      </Stack.Navigator>
    </Column>
  );
}
