import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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
  selectChartAction,
  reorderSectionsRequest,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';
import Comment from 'components/Text/Comment';
import DashedButton from 'components/Button/DashedButton';
import Divider from 'components/Divider';

import DraggableSectionComponent from '../components/DraggableSectionComponent';
import { ReportingDashboardPageContext } from '../../../constants';
import { FullWidthContainer } from '../../../styled';
import { DashboardSectionsContext } from '../constants';
import messages from '../messages';
import DraggableSectionParent from '../components/DraggableSectionParent';
import { orderDashboardSections } from '../utils';

const DashboardSections = ({
  fetchDashboardSections,
  addDashboardSection,
  dashboardSections,
  selectedChart,
  loaders,
  errors,
  selectChart,
  fromDashboardView,
  organizableId,
  reorderSections,
}) => {
  const { organizationId } = useContext(ReportingDashboardPageContext);
  const { formatMessage } = useIntl();

  const [isAnySectionDragging, setIsAnySectionDragging] = useState(true);

  const { addDashboardSectionLoader, fetchDashboardSectionsLoader } = loaders;

  // Reset settings on Component entry
  useEffect(() => {
    selectChart();
  }, []);

  useEffect(() => {
    fetchDashboardSections(organizableId || organizationId, fromDashboardView);
  }, [organizableId || organizationId]);

  const onAddDashboardSection = useCallback(
    () => addDashboardSection(organizationId),
    [organizationId],
  );

  const onDragEnd = ({ active, over }) => {
    if (!over || !active) return;
    if (over.id !== active.id) {
      const orderedNewList = orderDashboardSections(
        dashboardSections,
        active.id,
        over.id,
      );
      reorderSections(organizationId, orderedNewList);
    }
  };

  if (fetchDashboardSectionsLoader) return <Loader type="inline" />;

  return (
    <DashboardSectionsContext.Provider
      value={{
        dashboardSections,
        loaders,
        errors,
        selectedChart,
        fromDashboardView,
        isAnySectionDragging,
        setIsAnySectionDragging,
      }}
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
            <DraggableSectionParent
              onDragEnd={onDragEnd}
              dashboardSections={dashboardSections}
              fromDashboardView={fromDashboardView}
            >
              {dashboardSections.map((section, index) => (
                <DraggableSectionComponent
                  key={`SectionComponent-${index}-id-${section.id}`}
                  section={section}
                  index={index}
                  fromDashboardView={fromDashboardView}
                />
              ))}
            </DraggableSectionParent>
          </Col>
        </Row>

        {!fromDashboardView && (
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
        )}
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
  selectChart: PropTypes.func,
  reorderSections: PropTypes.func,
  fromDashboardView: PropTypes.bool,
  organizableId: PropTypes.string,
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
  selectChart: selectChartAction,
  reorderSections: reorderSectionsRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

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

export default compose(withConnect, ...reduxInjectors, memo)(DashboardSections);
