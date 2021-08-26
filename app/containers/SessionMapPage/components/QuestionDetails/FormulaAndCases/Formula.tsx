import React from 'react';

import Row from 'components/Row';

import { FormulaChip } from './styled';

type Props = {
  payload: Nullable<string>;
};

const Formula = ({ payload }: Props): JSX.Element => (
  <Row>
    <FormulaChip>{payload || '-'}</FormulaChip>
  </Row>
);

export default Formula;
