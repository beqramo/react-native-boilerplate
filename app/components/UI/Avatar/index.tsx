import React from 'react';

import { avatarPink } from 'assets';

import Image from '../Image';
import Text from '../Text';
import { ElementPropsType, Row } from '../View';

interface IAvatar extends ElementPropsType {}

function Avatar({ ...rest }: IAvatar) {
  return (
    <Row alignCenter {...rest}>
      <Image source={avatarPink} mr={5} />
      <Text color={'light'} fontWeight={3} fontSize={4}>
        Hello Maria
      </Text>
    </Row>
  );
}

export default Avatar;
