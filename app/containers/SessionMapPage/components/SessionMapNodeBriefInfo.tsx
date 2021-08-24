import React from 'react';

import Row from 'components/Row';
import H1 from 'components/H1';

type Props = {
  height: number;
  info: string;
};

const SessionMapNodeBriefInfo = ({ height, info }: Props): JSX.Element => (
  <Row height={height} justify="center" align="center">
    <H1>{info}</H1>
  </Row>
);

export default SessionMapNodeBriefInfo;
