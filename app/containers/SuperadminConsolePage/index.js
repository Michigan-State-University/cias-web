import React from 'react';

import { Col, Container, Row } from 'components/ReactGridSystem';

import { ResetAudio } from './ResetAudio';

const SuperadminConsolePage = () => (
  <Container pt={30}>
    <Row>
      <Col>
        <ResetAudio />
      </Col>
    </Row>
  </Container>
);

export default SuperadminConsolePage;
