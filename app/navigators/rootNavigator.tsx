import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  DefaultTheme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigator, MainParamList } from './mainNavigator';
import { ModalNavigator, ModalParamList } from './modalNavigator';

import { ROUTES } from './routes';
import { Column } from 'app/components/UI';

const exitRoutes = ['introduction'];

export const canExit = (routeName: string) => exitRoutes.includes(routeName);

export type RootParamList = {
  [ROUTES.mainNavigator]: NavigatorScreenParams<MainParamList>;
  [ROUTES.modalNavigator]: NavigatorScreenParams<ModalParamList>;
};

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName={ROUTES.mainNavigator}
      mode={'modal'}
    >
      <Stack.Screen
        name={ROUTES.mainNavigator}
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.modalNavigator}
        component={ModalNavigator}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <Column bg={'blue'} stretch>
      <NavigationContainer theme={MyTheme} {...props} ref={ref}>
        <RootStack />
      </NavigationContainer>
    </Column>
  );
});

RootNavigator.displayName = 'RootNavigator';
