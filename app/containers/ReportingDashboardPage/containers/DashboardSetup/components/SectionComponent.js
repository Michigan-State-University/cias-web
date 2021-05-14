import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  editDashboardSectionRequest,
  addChartRequest,
} from 'global/reducers/dashboardSections';

import Box from 'components/Box';
import { Row } from 'components/ReactGridSystem';

import AddChart from './AddChart';
import SectionUI from './SectionUI';

const SectionComponent = ({
  section,
  editDashboardSection,
  index,
  addChart,
}) => {
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

  return (
    <>
      <SectionUI
        showDivider={index !== 0}
        name={section.name}
        description={section.description}
        onDescriptionChange={onUpdate('description')}
        onNameChange={onUpdate('name')}
      />

      <Box mb={40}>
        <Row margin="0 !important">
          <AddChart addChart={onAddChart} />
        </Row>
      </Box>
    </>
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
  addChart: PropTypes.func,
  index: PropTypes.number,
};

const mapDispatchToProps = {
  editDashboardSection: editDashboardSectionRequest,
  addChart: addChartRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionComponent);
