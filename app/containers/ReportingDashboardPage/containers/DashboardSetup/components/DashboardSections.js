import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import {
  addDashboardSectionRequest,
  allDashboardSectionsSagas,
  dashboardSectionsReducer,
  fetchDashboardSectionsRequest,
  makeSelectDashboardSections,
  makeSelectErrors,
  makeSelectLoaders,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import DashedButton from 'components/Button/DashedButton';

import Divider from 'components/Divider';

import { DashboardSectionsContext } from 'containers/ReportingDashboardPage/containers/DashboardSetup/constants';
import { ReportingDashboardPageContext } from 'containers/ReportingDashboardPage/constants';
import { injectReducer, injectSaga } from 'redux-injectors';
import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const DashboardSections = ({
  fetchDashboardSections,
  dashboardSections,
  loaders,
  errors,
}) => {
  const { organizationId } = useContext(ReportingDashboardPageContext);
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchDashboardSections(organizationId);
  }, [organizationId]);

  if (false) return <Loader fullSize />;

  return (
    <DashboardSectionsContext.Provider
      value={{ dashboardSections, loaders, errors }}
    >
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
    </DashboardSectionsContext.Provider>
  );
};

DashboardSections.propTypes = {
  fetchDashboardSections: PropTypes.func,
  dashboardSections: PropTypes.arrayOf(PropTypes.object),
  loaders: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  dashboardSections: makeSelectDashboardSections(),
});

const mapDispatchToProps = {
  fetchDashboardSections: fetchDashboardSectionsRequest,
  addDashboardSection: addDashboardSectionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const reduxInjectors = [
  injectReducer({
    key: 'dashboardSections',
    reducer: dashboardSectionsReducer,
  }),
  injectSaga({
    key: 'dashboardSections',
    saga: allDashboardSectionsSagas,
  }),
];

export default compose(
  withConnect,
  ...reduxInjectors,
)(DashboardSections);
