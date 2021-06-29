import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  editDashboardSectionRequest,
  addChartRequest,
  selectChartAction,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import SidePanel from 'components/SidePanel';

import ChartTileUI from './ChartTileUI';
import AddChart from './AddChart';
import SectionUI from './SectionUI';
import ChartSettings from './ChartSettings';

import { DashboardSectionsContext } from '../constants';
import { FullWidthContainer } from '../../../styled';

const SectionComponent = ({
  section: { id, organizationId, name, description, charts },
  editDashboardSection,
  index,
  addChart,
  selectChart,
  draggableHandler,
}) => {
  const { selectedChart, fromDashboardView } = useContext(
    DashboardSectionsContext,
  );

  const closeSettings = useCallback(() => selectChart(), []);

  const onUpdate = useCallback(
    field => value =>
      editDashboardSection(
        {
          organizationId,
          [field]: value,
        },
        id,
      ),
    [id, organizationId],
  );

  const onAddChart = useCallback(type => addChart(id, type), [id]);

  const onSelectChart = useCallback(
    chartId => {
      if (!fromDashboardView) selectChart(id, chartId);
    },
    [id],
  );

  return (
    <>
      <SectionUI
        showDivider={index !== 0}
        name={name}
        description={description}
        onDescriptionChange={onUpdate('description')}
        onNameChange={onUpdate('name')}
        fromDashboardView={fromDashboardView}
        draggableHandler={draggableHandler}
      />

      <FullWidthContainer>
        <Row mb={40} justify="around">
          {!fromDashboardView && (
            <Col xs="content" mb={40}>
              <AddChart addChart={onAddChart} />
            </Col>
          )}
          {charts.map(chart => {
            const isSelected =
              selectedChart?.id === chart.id &&
              selectedChart?.dashboardSectionId === id;

            return (
              <Col key={`Chart-${chart.id}-Section-${id}`} xs="content" mb={40}>
                <ChartTileUI
                  fromDashboardView={fromDashboardView}
                  chart={chart}
                  onClick={onSelectChart}
                  isSelected={isSelected}
                />
              </Col>
            );
          })}
        </Row>
      </FullWidthContainer>

      {!fromDashboardView && (
        <SidePanel isOpen={Boolean(selectedChart)} style={{ width: 500 }}>
          <ChartSettings onClose={closeSettings} chart={selectedChart} />
        </SidePanel>
      )}
    </>
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
  addChart: PropTypes.func,
  selectChart: PropTypes.func,
  index: PropTypes.number,
  draggableHandler: PropTypes.node,
};

const mapDispatchToProps = {
  editDashboardSection: editDashboardSectionRequest,
  addChart: addChartRequest,
  selectChart: selectChartAction,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionComponent);
