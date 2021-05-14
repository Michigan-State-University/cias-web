import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { editDashboardSectionRequest } from 'global/reducers/dashboardSections';

import Box from 'components/Box';

import AddChart from './AddChart';
import SectionUI from './SectionUI';

const SectionComponent = ({ section, editDashboardSection, index }) => {
  const onUpdate = useCallback(
    field => value =>
      editDashboardSection(
        {
          organizationId: section.organizationId,
          [field]: value,
        },
        section.id,
      ),
    [section],
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

      <Box mb={40}>
        <AddChart />
      </Box>
    </>
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
  index: PropTypes.number,
};

const mapDispatchToProps = {
  editDashboardSection: editDashboardSectionRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionComponent);
