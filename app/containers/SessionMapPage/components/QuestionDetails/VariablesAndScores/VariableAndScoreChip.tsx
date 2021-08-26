import React from 'react';

import { Chip, Score, Variable } from './styled';

type Props = {
  name: Nullable<string>;
  score: Nullable<string>;
};

const VariableAndScoreChip = ({ name, score }: Props): JSX.Element => (
  <Chip>
    <Variable>{name || '-'}</Variable>
    <Score>{score || '-'}</Score>
  </Chip>
);

export default VariableAndScoreChip;
