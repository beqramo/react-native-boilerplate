import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { modalScreens } from 'app/screens';

import { ROUTES } from './routes';

export type ModalParamList = {
  [ROUTES.successOrDeclined]:
    | {
        success?: boolean;
        title?: string;
        description?: string;
        buttonText?: string;
        onPress?: () => void;
      }
    | undefined;
};

const Stack = createStackNavigator<ModalParamList>();

export function ModalNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName={ROUTES.successOrDeclined}
      mode={'modal'}
    >
      {Object.entries(modalScreens).map(
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
  );
}
