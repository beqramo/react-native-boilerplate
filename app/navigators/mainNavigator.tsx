import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/core';

import { NotLoggedNavigator, NotLoggedParamList } from './notLoggedNavigator';
import {
  HomeTabNavigator,
  HomeTabNavigationParamList,
} from './homeTabNavigation';

import { ROUTES } from './routes';

export type MainParamList = {
  [ROUTES.notLoggedNavigator]: NavigatorScreenParams<NotLoggedParamList>;
  [ROUTES.homeTab]: NavigatorScreenParams<HomeTabNavigationParamList>;
};

const Stack = createStackNavigator<MainParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.notLoggedNavigator}
    >
      <Stack.Screen
        name={ROUTES.notLoggedNavigator}
        component={NotLoggedNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.homeTab}
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
