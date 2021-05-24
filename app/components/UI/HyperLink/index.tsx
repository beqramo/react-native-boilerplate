import React from 'react';
import RNHyperLink from 'react-native-hyperlink';

import { useTheme } from 'app/utils';

import Text from '../Text';
import { Column, ElementPropsType } from '../View';

interface IHyperLinkPropsType
  extends ElementPropsType,
    React.ComponentProps<typeof RNHyperLink> {
  text?: string;
  links?: { previewAs: string; matcher: string }[];
  linkColor?: string;
  children?: any;
}

const HyperLink = ({
  text,
  links,
  linkColor,
  children,
  ...rest
}: IHyperLinkPropsType) => {
  const { colors } = useTheme();

  const content = text || children;
  return (
    <Column
      as={RNHyperLink}
      linkStyle={{ color: colors[linkColor ?? ''] }}
      linkText={(url) => {
        const val = links?.find(({ matcher }) => matcher === url);
        return val ? val.previewAs : url;
      }}
      linkDefault
      {...rest}
    >
      <Text textAlign={'left'} ml={4} fontSize={2}>
        {content}
      </Text>
    </Column>
  );
};

HyperLink.defaultProps = {
  linkColor: 'orange',
};

export default HyperLink;
