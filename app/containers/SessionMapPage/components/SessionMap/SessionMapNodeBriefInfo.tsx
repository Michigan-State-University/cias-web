import React from 'react';

import Row from 'components/Row';
import H1 from 'components/H1';

type Props = {
  minHeight: number;
  info: string;
};

const SessionMapNodeBriefInfo = ({ minHeight, info }: Props): JSX.Element => (
  <Row minHeight={minHeight} justify="center" align="center">
    <H1>{info}</H1>
  </Row>
);

export default SessionMapNodeBriefInfo;
