import React from 'react';

import { colors } from 'theme';

import Column from 'components/Column';
import Row from 'components/Row';

type Props = {
  leftContent: JSX.Element;
  rightContent: JSX.Element;
};

const NavigatorModalLayout = ({ leftContent, rightContent }: Props) => (
  <Row display="flex" justifyContent="between">
    <Column mr={40}>{leftContent}</Column>
    <Column width={1} bg={colors.linkWater} />
    <Column ml={40}>{rightContent}</Column>
  </Row>
);

export default NavigatorModalLayout;
