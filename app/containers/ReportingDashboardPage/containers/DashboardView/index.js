import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Container, Col, Row } from 'components/ReactGridSystem';

import messages from '../../messages';

const DashboardView = () => {
  const { organizationId } = useParams();
  const { formatMessage } = useIntl();

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.dashboardView)}</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            <div>Dashboard View {organizationId}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

DashboardView.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(DashboardView);
