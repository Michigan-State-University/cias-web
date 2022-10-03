import React from 'react';

import { colors } from 'theme';
import { ColoredChip, MultiColoredChip } from 'components/ColoredChip';

type Props = {
  variable: Nullable<string>;
  score?: Nullable<string>;
  variableOnly?: boolean;
  hsValue?: Nullable<string>;
};

const VariableAndScoreChip = ({
  variable,
  score,
  variableOnly,
  hsValue,
}: Props): JSX.Element => {
  if (variableOnly) {
    return (
      <ColoredChip color={colors.jungleGreen}>{variable || '-'}</ColoredChip>
    );
  }

  if (hsValue) {
    return (
      <MultiColoredChip
        leftChipColor={colors.jungleGreen}
        leftChipContent={variable || '-'}
        rightChipColor={colors.kleinBlue}
        rightChipContent={hsValue}
        middleChipColor={colors.azure}
        middleChipContent={score || '-'}
      />
    );
  }

  return (
    <MultiColoredChip
      leftChipColor={colors.jungleGreen}
      leftChipContent={variable || '-'}
      rightChipColor={colors.azure}
      rightChipContent={score || '-'}
    />
  );
};

export default VariableAndScoreChip;
