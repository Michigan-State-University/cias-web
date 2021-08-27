import React from 'react';

import { colors } from 'theme';

import Row from 'components/Row';
import ColoredChip from 'components/ColoredChip';

type Props = {
  payload: Nullable<string>;
};

const Formula = ({ payload }: Props): JSX.Element => (
  <Row>
    <ColoredChip color={colors.orangePeel}>{payload || '-'}</ColoredChip>
  </Row>
);

export default Formula;
