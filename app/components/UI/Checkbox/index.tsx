import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';

import { checkmarkWhiteIcon } from 'assets';

import { useTheme } from 'app/utils';

import { ElementPropsType, Row } from '../View';
import Image from '../Image';
import Text from '../Text';
import HyperLink from '../HyperLink';

import { Box } from './styles';

type CheckboxPropsType = {
  text: string;
  value: boolean;
  onChange: (val: boolean | undefined) => void;
  links?: { previewAs: string; matcher: string }[];
  linkColor?: string;
} & ElementPropsType;

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef(
  (
    { text, value, onChange, links, linkColor, ...rest }: CheckboxPropsType,
    ref,
  ) => {
    const { colors } = useTheme();
    return (
      <Row width={'100%'} {...rest}>
        <Box
          as={TouchableOpacity}
          onPress={() => onChange(value ? undefined : true)}
          size={22}
          bg={value ? 'orange' : 'light'}
          justifyCenter
          alignCenter
          borderColor={value ? 'orange' : 'dark'}
          mt={1}
          ref={ref}
        >
          {value && <Image source={checkmarkWhiteIcon} />}
        </Box>

        <HyperLink
          linkStyle={{ color: colors[linkColor ?? ''] }}
          linkText={(url) => {
            const val = links?.find(({ matcher }) => matcher === url);
            return val ? val.previewAs : url;
          }}
          linkDefault
        >
          <Text textAlign={'left'} ml={4} fontSize={2}>
            {text}
          </Text>
        </HyperLink>
      </Row>
    );
  },
);

Checkbox.defaultProps = {
  linkColor: 'orange',
};

export default Checkbox;
