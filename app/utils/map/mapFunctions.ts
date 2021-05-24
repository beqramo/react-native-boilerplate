/* eslint-disable react-native/split-platform-components */
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

import appConfig from 'app.json';
import { IS_IOS } from '../constants';

type RegionFrom = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const locationIfNoGPS = {
  lat: 0,
  lng: 0,
};
export const locationIfNoGPSLong = {
  latitude: 0,
  longitude: 0,
};

export const closeDelta = {
  latitudeDelta: 0.0005,
  longitudeDelta: 0.0001,
};
export function regionFrom(
  lat: number,
  lng: number,
  zoomLevel: number,
): RegionFrom {
  zoomLevel = zoomLevel / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = zoomLevel / circumference;

  const latitudeDelta = zoomLevel / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat),
    ),
  );
  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta,
    longitudeDelta,
  };
}

export const mergeCoords = (
  lat: number | string,
  lng: number | string,
): string => {
  return lat + ',' + lng;
};

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} },
      ],
    );
  }

  return false;
};

export const hasLocationPermission = async () => {
  if (IS_IOS) {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (!IS_IOS && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const getLocation = async (): Promise<GeoPosition | false | null> => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return null;
  }

  return new Promise((resolve) =>
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        resolve(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        resolve(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    ),
  );
};
