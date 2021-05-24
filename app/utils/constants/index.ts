import { Dimensions, Platform, StatusBar } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { getStatusBarHeight, ifIphoneX } from 'react-native-iphone-x-helper';

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window') ?? {};

export const TIMING_DURATION = {
  duration: 500,
  easing: Easing.out(Easing.exp),
};

export const IS_IOS = Platform.OS === 'ios';

export const STATUSBAR_HEIGHT = getStatusBarHeight();
export const STATUSBAR_HEIGHT_NOT_NOTCH = IS_IOS
  ? ifIphoneX(0, 20)
  : StatusBar.currentHeight ?? 20;

export const MAP_API = 'AIzaSyCmFlBijkD4vTZW6TAQiJOy32_HvigOtjw';
export const MAP_URL = 'https://maps.googleapis.com/maps/api';
