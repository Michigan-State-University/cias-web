import React from 'react';

import { themeColors } from 'theme';

import { SectionBody } from '../components/styled';

const HelpingMaterialsSectionBody = () => (
  <SectionBody
    borderLeft={`1px solid ${themeColors.highlight}`}
    px={16}
    py={24}
  >
    Helping materials
  </SectionBody>
);

export default HelpingMaterialsSectionBody;
