import React from 'react';

import { colors } from 'theme';

import { MultiColoredChip } from 'components/ColoredChip';

type Props = {
  recipient: string;
  template?: string;
};

const RecipientAndReportTemplateChip = ({
  recipient,
  template,
}: Props): JSX.Element => (
  <MultiColoredChip
    leftChipColor={colors.kleinBlue}
    leftChipContent={recipient || '-'}
    rightChipColor={colors.bluewood}
    rightChipContent={template || '-'}
  />
);

export default RecipientAndReportTemplateChip;
