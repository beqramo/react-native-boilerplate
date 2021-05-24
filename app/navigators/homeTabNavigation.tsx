import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CONSTANTS, useTheme } from 'app/utils';

import { Image } from 'app/components/UI';

export type HomeTabNavigationParamList = {};

const Tab = createBottomTabNavigator<HomeTabNavigationParamList>();

export function HomeTabNavigator() {
  const { colors } = useTheme();

  const { bottom } = useSafeAreaInsets();
  const renderTabIcon = useCallback(
    (icon) => ({ focused, size }) => (
      <Image source={icon} size={size} opacity={focused ? 1 : 0.6} />
    ),
    [],
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.dark,
        inactiveTintColor: '#16203A99',
        safeAreaInsets: { bottom: CONSTANTS.IS_IOS ? bottom : 8 },
      }}
    >
      {/* <Tab.Screen
        name={ROUTES.home}
        component={home}
        options={{
          tabBarIcon: renderTabIcon(homeTabIcon),
        }}
      /> */}
    </Tab.Navigator>
  );
}
