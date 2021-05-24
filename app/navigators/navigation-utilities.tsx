import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import {
  PartialState,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import { ROUTES_WITH_LIGHT_STATUSBAR } from './routes';

export const RootNavigation = {
  navigate(name: string) {
    name; // eslint-disable-line no-unused-expressions
  },
  goBack() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  resetRoot(state?: PartialState<NavigationState> | NavigationState) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getRootState(): NavigationState {
    return {} as any;
  },
};

export const setRootNavigation = (
  ref: React.RefObject<NavigationContainerRef | undefined>,
) => {
  for (const method in RootNavigation) {
    RootNavigation[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
};

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
) {
  const route = state.routes[state.index ?? 0];

  // Found the active route -- return the name
  if (!route.state) return route.name;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

export function useBackButtonHandler(
  ref: React.RefObject<NavigationContainerRef | undefined>,
  canExit: (routeName: string) => boolean,
) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      const navigation = ref.current;

      if (navigation == null) {
        return false;
      }

      // grab the current route
      const routeName = getActiveRouteName(navigation.getRootState());

      // are we allowed to exit?
      if (canExitRef.current(routeName)) {
        // let the system know we've not handled this event
        return false;
      }

      // we can't exit, so let's turn this into a back action
      if (navigation.canGoBack()) {
        navigation.goBack();

        return true;
      }

      return false;
    };

    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Unsubscribe when we're done
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [ref]);
}

const correctStatusbarColor = (route: string) => {
  StatusBar.setBarStyle(
    ROUTES_WITH_LIGHT_STATUSBAR.find((val) => val === route)
      ? 'light-content'
      : 'dark-content',
    true,
  );
};

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState<
    NavigationState | undefined
  >();
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(
    true,
  );

  const routeNameRef = useRef();
  const onNavigationStateChange = (state: NavigationState | undefined) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = !!state && getActiveRouteName(state);
    correctStatusbarColor(currentRouteName);

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console?.tron?.log?.(currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;

    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  const restoreState = useCallback(async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestoringNavigationState(false);
    }
  }, [persistenceKey, storage]);

  useEffect(() => {
    if (isRestoringNavigationState) restoreState();
  }, [isRestoringNavigationState, restoreState]);

  return { onNavigationStateChange, restoreState, initialNavigationState };
}
