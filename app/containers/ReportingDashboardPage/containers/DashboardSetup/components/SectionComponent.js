import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { editDashboardSectionRequest } from 'global/reducers/dashboardSections';

import SectionUI from './SectionUI';

const SectionComponent = ({ section, editDashboardSection }) => {
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
    <SectionUI
      name={section.name}
      description={section.description}
      onDescriptionChange={onUpdate('description')}
      onNameChange={onUpdate('name')}
    />
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
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
