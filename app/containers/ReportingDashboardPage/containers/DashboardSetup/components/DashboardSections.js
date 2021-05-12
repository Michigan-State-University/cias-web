import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import DashedButton from 'components/Button/DashedButton';
import Divider from 'components/Divider';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const DashboardSections = () => {
  const { formatMessage } = useIntl();

  if (false) return <Loader fullSize />;

  return (
    <>
      <FullWidthContainer>
        <Row>
          <Col mb={40}>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col mb={30}>
            <Comment>{formatMessage(messages.dashboardSectionsHeader)}</Comment>
          </Col>
        </Row>

        <Row>
          <Col mb={30}>
            <DashedButton transparent>
              {formatMessage(messages.addNewSection)}
            </DashedButton>
          </Col>
        </Row>
      </FullWidthContainer>
    </>
  );
};

DashboardSections.propTypes = {};

const mapStateToProps = () => createStructuredSelector({});

const mapDispatchToProps = {};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardSections);
