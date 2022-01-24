import React from 'react';

import Text from 'components/Text';
import H2 from 'components/H2';

type TlfbTitleProps = {
  smallText: string;
  bigText: string;
};

export const TlfbTitle = ({ smallText, bigText }: TlfbTitleProps) => (
  <div>
    <Text mb={12} lineHeight="13px" style={{ opacity: '0.9' }}>
      {smallText}
    </Text>
    <H2 mb={32} fontSize={20}>
      {bigText}
    </H2>
  </div>
);

export default TlfbTitle;
