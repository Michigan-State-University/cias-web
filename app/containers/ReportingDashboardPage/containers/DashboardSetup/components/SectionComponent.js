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
  section,
  editDashboardSection,
  index,
  addChart,
  selectChart,
}) => {
  const { selectedChart } = useContext(DashboardSectionsContext);

  const closeSettings = useCallback(() => selectChart(), []);

  const onUpdate = useCallback(
    field => value =>
      editDashboardSection(
        {
          organizationId: section.organizationId,
          [field]: value,
        },
        section.id,
      ),
    [section.id, section.organizationId],
  );

  const onAddChart = useCallback(type => addChart(section.id, type), [
    section.id,
  ]);

  const onSelectChart = useCallback(
    chartId => selectChart(section.id, chartId),
    [section.id],
  );

  return (
    <>
      <SectionUI
        showDivider={index !== 0}
        name={section.name}
        description={section.description}
        onDescriptionChange={onUpdate('description')}
        onNameChange={onUpdate('name')}
      />

      <FullWidthContainer>
        <Row mb={40} justify="around">
          <Col xs="content" mb={40}>
            <AddChart addChart={onAddChart} />
          </Col>
          {section.charts.map(chart => {
            const isSelected =
              selectedChart?.id === chart.id &&
              selectedChart?.dashboardSectionId === section.id;

            return (
              <Col
                key={`Chart-${chart.id}-Section-${section.id}`}
                xs="content"
                mb={40}
              >
                <ChartTileUI
                  chart={chart}
                  onClick={onSelectChart}
                  isSelected={isSelected}
                />
              </Col>
            );
          })}
        </Row>
      </FullWidthContainer>

      <SidePanel isOpen={Boolean(selectedChart)} style={{ width: 500 }}>
        <ChartSettings onClose={closeSettings} chart={selectedChart} />
      </SidePanel>
    </>
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
  addChart: PropTypes.func,
  selectChart: PropTypes.func,
  index: PropTypes.number,
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
