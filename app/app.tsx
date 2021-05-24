import './i18n';
import './utils/ignore-warnings';
import 'yup-phone';

import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { enableScreens } from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import DropdownAlert from 'react-native-dropdownalert';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import * as storage from './utils/storage';
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from './navigators';
import { RootStore, RootStoreProvider, setupRootStore } from './models';
import { ToggleStorybook } from '../storybook/toggle-storybook';
import { mainTheme } from './theme';
import { CONSTANTS, DropDownHolder } from './utils';

enableScreens();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    (async () => {
      if (!CONSTANTS.IS_IOS) {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      }
      setupRootStore().then(setRootStore);
      await RNBootSplash.hide({ fade: true });
    })();
  }, []);

  if (!rootStore) return null;

  return (
    <ThemeProvider theme={mainTheme}>
      <ActionSheetProvider>
        <ToggleStorybook>
          <RootStoreProvider value={rootStore}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                // initialState={initialNavigationState} // TODO: temp
                onStateChange={onNavigationStateChange}
              />
            </SafeAreaProvider>
          </RootStoreProvider>
        </ToggleStorybook>
      </ActionSheetProvider>
      <DropdownAlert
        ref={(ref) => DropDownHolder.setDropDown(ref)}
        translucent={true}
        closeInterval={3000}
      />
    </ThemeProvider>
  );
}

export default App;
