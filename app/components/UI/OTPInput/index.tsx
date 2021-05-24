import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { useTheme } from 'app/utils';
import { Column } from '../View';

interface IOTPInput
  extends Omit<React.ComponentProps<typeof OTPInputView>, 'pinCount'> {
  pinCount?: number;
}

const OTPInput = forwardRef<OTPInputView, IOTPInput>(
  ({ pinCount, ...rest }, ref) => {
    const { colors } = useTheme();
    return (
      <Column px={'8%'}>
        <OTPInputView
          style={styles.inputStyle}
          autoFocusOnLoad
          codeInputFieldStyle={{
            ...styles.underlineStyleBase,
            color: colors.backgroundDark,
          }}
          codeInputHighlightStyle={{
            borderColor: colors.backgroundDark,
          }}
          pinCount={pinCount ?? 6}
          {...rest}
          ref={ref}
        />
      </Column>
    );
  },
);

export default OTPInput;

const styles = StyleSheet.create({
  inputStyle: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    width: '100%',
  },

  underlineStyleBase: {
    borderBottomWidth: 1,
    borderWidth: 0,
    fontSize: 18,
    height: 45,
    width: 30,
  },
});
