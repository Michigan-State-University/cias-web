import React from 'react';

import { colors } from 'theme';

import { DoubleColoredChip } from 'components/ColoredChip';

type Props = {
  email: string;
  template?: string;
};

const EmailAndReportTemplateChip = ({
  email,
  template,
}: Props): JSX.Element => (
  <DoubleColoredChip
    leftChipColor={colors.azure}
    leftChipContent={email || '-'}
    rightChipColor={colors.bluewood}
    rightChipContent={template || '-'}
  />
);

export default EmailAndReportTemplateChip;
