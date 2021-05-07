import React, { memo, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import ClinicIcon from 'assets/svg/clinic-icon.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';

import TopPanelComponent from './TopPanelComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const ClinicSettings = () => {
  const { formatMessage } = useIntl();

  const {
    selectedEntity,
    organization,
    loaders: { fetchOrganization: fetchOrganizationLoader },
  } = useContext(ManageOrganizationsContext);

  const clinic = useMemo(() => {
    const healthSystem = organization.healthSystems.find(
      ({ id }) => id === selectedEntity.parentId,
    );

    return healthSystem.healthClinics.find(
      ({ id }) => id === selectedEntity.id,
    );
  });

  if (!organization || fetchOrganizationLoader) return <Loader type="inline" />;

  return (
    <>
      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.clinicHeader)}
            icon={ClinicIcon}
            isDeleting={false}
            label={formatMessage(messages.clinicLabel)}
            name={clinic.name}
            onDelete={null}
            onEdit={null}
            placeholder={formatMessage(messages.clinicPlaceholder)}
          />
        </Col>
      </Row>
    </>
  );
};

ClinicSettings.propTypes = {};

const mapDispatchToProps = {};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(ClinicSettings));
