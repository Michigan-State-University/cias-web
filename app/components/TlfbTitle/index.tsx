import React from 'react';

import Text from 'components/Text';
import H2 from 'components/H2';
import Row from 'components/Row';
import TlfbHelpingMaterials from 'components/TlfbHelpingMaterials';

type TlfbTitleProps = {
  smallText: string;
  bigText: string;
  displayHelpingMaterials: boolean;
};

export const TlfbTitle = ({
  smallText,
  bigText,
  displayHelpingMaterials,
}: TlfbTitleProps) => (
  <div>
    <Text mb={12} lineHeight="13px" style={{ opacity: '0.9' }}>
      {smallText}
    </Text>
    <Row display="flex" justify="between" mb={32}>
      <H2 fontSize={20}>{bigText}</H2>
      {displayHelpingMaterials && <TlfbHelpingMaterials />}
    </Row>
  </div>
);

export default TlfbTitle;
