import React from 'react';
import { Markup } from 'interweave';

import Box from 'components/Box';
import Row from 'components/Row';
import TlfbHelpingMaterials from 'components/TlfbHelpingMaterials';

type TlfbTitleProps = {
  title: string;
  subtitle: string;
  displayHelpingMaterials: boolean;
};

export const TlfbTitle = ({
  title,
  subtitle,
  displayHelpingMaterials,
}: TlfbTitleProps) => (
  <div>
    <Box mb={12} dir="auto">
      <Markup content={title} />
    </Box>
    <Row
      display="flex"
      justify="between"
      marginBlockEnd={32}
      gap={16}
      dir="auto"
    >
      <Markup content={subtitle} />
      {displayHelpingMaterials && <TlfbHelpingMaterials />}
    </Row>
  </div>
);

export default TlfbTitle;
