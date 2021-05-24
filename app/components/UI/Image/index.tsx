import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image as RNImage,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

import { useTheme } from 'app/utils';

import { Column, ElementPropsType } from '../View';

import { Container } from './styles';

export interface IImage extends ElementPropsType {
  source: ImageSourcePropType | Source;
  tintColor: string;
  style?: StyleProp<ImageStyle>;
}

const Image = ({ source, tintColor: tColor, ...rest }: IImage) => {
  const { colors } = useTheme();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const tintColor = colors[tColor] ?? tColor;

  const onLayout = useCallback(
    (event) => {
      const { width, height } =
        event?.nativeEvent?.layout ?? Dimensions.get('window');

      setDimensions({ width, height });
    },
    [setDimensions],
  );

  return typeof source === 'object' ? (
    <Column stretch onLayout={onLayout} justifyCenter>
      {!!dimensions && (
        <Container
          as={FastImage}
          {...dimensions}
          source={source as Source}
          resizeMode={FastImage.resizeMode.contain}
          style={{ tintColor }}
          {...rest}
        />
      )}
    </Column>
  ) : (
    <Container
      as={RNImage}
      source={source as ImageSourcePropType}
      resizeMode={FastImage.resizeMode.contain}
      style={{ tintColor }}
      {...rest}
    />
  );
};

Image.defaultProps = {
  contentType: null,
  image: null,
  innerRef: null,
  resizeMode: 'contain',
  source: null,
  tintColor: undefined,
};

export default Image;
