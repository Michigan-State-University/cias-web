import React from 'react';

import { colors } from 'theme';

import { MultiColoredChip } from 'components/ColoredChip';

type Props = {
  email: string;
  template?: string;
};

const EmailAndReportTemplateChip = ({
  email,
  template,
}: Props): JSX.Element => (
  <MultiColoredChip
    leftChipColor={colors.azure}
    leftChipContent={email || '-'}
    rightChipColor={colors.bluewood}
    rightChipContent={template || '-'}
  />
);

export default EmailAndReportTemplateChip;
