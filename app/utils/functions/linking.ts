import { Alert, Linking } from 'react-native';

const WWW_URL_PATTERN = /^www\./i;

const navigateToUrl = (url: string) => {
  if (WWW_URL_PATTERN.test(url)) {
    navigateToUrl(`http://${url}`);
  } else {
    try {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          // eslint-disable-next-line
          // console.error('No handler for URL:', normalizedUrl)
        } else {
          Linking.openURL(url);
        }
      });
    } catch (e) {
      Alert.alert('URL cannot be opened');
    }
  }
};

export default {
  navigateToUrl,
};
