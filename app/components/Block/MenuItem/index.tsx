import React from 'react';
import { TouchableOpacity } from 'react-native';

import { arrowRightIcon } from 'assets';

import { ITextProps } from 'app/components/UI/Text';
import { ElementPropsType } from 'app/components/UI/View';
import { Image, Row, Text } from 'app/components/UI';

import { Container } from './styles';

interface IMenuItem extends ElementPropsType {
  text: string;
  onPress: () => void;
  textStyle?: ITextProps;
}

function MenuItem({ text, onPress, textStyle, ...rest }: IMenuItem) {
  return (
    <Container>
      <Row
        as={TouchableOpacity}
        height={'60px'}
        bg={'light'}
        justifySpaceBetween
        alignCenter
        borderRadius={7}
        px={7}
        onPress={onPress}
        mb={7}
        {...rest}
      >
        <Row alignCenter style={{ flex: -1 }}>
          <Text fontSize={5} opacity={0.8} textAlign={'left'} {...textStyle}>
            {text}
          </Text>
        </Row>
        <Image source={arrowRightIcon} />
      </Row>
    </Container>
  );
}

export default MenuItem;
