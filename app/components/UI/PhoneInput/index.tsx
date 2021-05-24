import React, { forwardRef, useMemo } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { usaFlagIcon } from 'assets';

import { FUNCTIONS } from 'app/utils/functions';

import TextInput, { ITextInputCustomPropsType } from '../TextInput';
import Text from '../Text';
import Image from '../Image';
import { Row } from '../View';

interface IPhoneInput extends ITextInputCustomPropsType {}

const PhoneInput = forwardRef<RNTextInput, IPhoneInput>(
  ({ onChangeText, ...rest }, ref) => {
    const renderLeft = useMemo(
      () => (
        <Row alignCenter justifyCenter>
          <Image source={usaFlagIcon} size={20} mr={3} />
          <Text lineHeight={'20px'}>+1</Text>
        </Row>
      ),
      [],
    );

    const onChange = (val: string) => {
      onChangeText?.(FUNCTIONS.getFormatedInput(val));
    };

    return (
      <TextInput
        renderLeft={renderLeft}
        {...rest}
        onChangeText={onChange}
        ref={ref}
        pl={14}
      />
    );
  },
);

export default PhoneInput;
