import React from 'react';

import { colors } from 'theme';
import { ColoredChip, DoubleColoredChip } from 'components/ColoredChip';

type Props = {
  variable: Nullable<string>;
  score?: Nullable<string>;
  variableOnly?: boolean;
};

const VariableAndScoreChip = ({
  variable,
  score,
  variableOnly,
}: Props): JSX.Element => {
  if (variableOnly) {
    return (
      <ColoredChip color={colors.jungleGreen}>{variable || '-'}</ColoredChip>
    );
  }

  return (
    <DoubleColoredChip
      leftChipColor={colors.jungleGreen}
      leftChipContent={variable || '-'}
      rightChipColor={colors.azure}
      rightChipContent={score || '-'}
    />
  );
};

export default VariableAndScoreChip;
