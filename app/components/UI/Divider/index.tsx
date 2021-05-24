import React from 'react';

import { Column, ElementPropsType } from '../View';

interface IDivider extends ElementPropsType {}

function Divider({ ...rest }: IDivider) {
  return <Column height={'1px'} bg={'borderGrey'} {...rest} />;
}

export default Divider;
