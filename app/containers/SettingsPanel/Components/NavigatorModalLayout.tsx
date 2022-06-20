import React from 'react';

import { colors } from 'theme';

import Column from 'components/Column';
import Row from 'components/Row';

type Props = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

const NavigatorModalLayout = ({ leftContent, rightContent }: Props) => (
  <Row display="flex" justifyContent="between">
    <Column>{leftContent}</Column>
    <Column width={1} mx={40} bg={colors.linkWater} />
    <Column>{rightContent}</Column>
  </Row>
);

export default NavigatorModalLayout;
