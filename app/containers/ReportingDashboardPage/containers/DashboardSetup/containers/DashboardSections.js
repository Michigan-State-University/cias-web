import React, { memo, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { injectReducer, injectSaga } from 'redux-injectors';

import {
  addDashboardSectionRequest,
  allDashboardSectionsSagas,
  dashboardSectionsReducer,
  fetchDashboardSectionsRequest,
  makeSelectDashboardSections,
  makeSelectErrors,
  makeSelectLoaders,
  makeSelectSelectedChart,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import DashedButton from 'components/Button/DashedButton';
import Divider from 'components/Divider';

import SectionComponent from '../components/SectionComponent';
import { ReportingDashboardPageContext } from '../../../constants';
import { FullWidthContainer } from '../../../styled';
import { DashboardSectionsContext } from '../constants';
import messages from '../messages';

const DashboardSections = ({
  fetchDashboardSections,
  addDashboardSection,
  dashboardSections,
  selectedChart,
  loaders,
  errors,
}) => {
  const { organizationId } = useContext(ReportingDashboardPageContext);
  const { formatMessage } = useIntl();

  const { addDashboardSectionLoader, fetchDashboardSectionsLoader } = loaders;

  useEffect(() => {
    fetchDashboardSections(organizationId);
  }, [organizationId]);

  const onAddDashboardSection = useCallback(
    () => addDashboardSection(organizationId),
    [organizationId],
  );

  if (fetchDashboardSectionsLoader) return <Loader type="inline" />;

  return (
    <DashboardSectionsContext.Provider
      value={{ dashboardSections, loaders, errors, selectedChart }}
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
          <Col mt={10}>
            {dashboardSections.map((section, index) => (
              <SectionComponent
                key={`SectionComponent-${index}-id-${section.id}`}
                section={section}
                index={index}
              />
            ))}
          </Col>
        </Row>

        <Row my={30}>
          <Col>
            <DashedButton
              onClick={onAddDashboardSection}
              loading={addDashboardSectionLoader}
              transparent
            >
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
  addDashboardSection: PropTypes.func,
  dashboardSections: PropTypes.arrayOf(PropTypes.object),
  loaders: PropTypes.object,
  selectedChart: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  dashboardSections: makeSelectDashboardSections(),
  selectedChart: makeSelectSelectedChart(),
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
  memo,
)(DashboardSections);
