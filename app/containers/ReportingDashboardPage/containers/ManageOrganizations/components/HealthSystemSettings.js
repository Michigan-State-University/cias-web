import React, { memo, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useIntl } from 'react-intl';

import HealthSystemIcon from 'assets/svg/health-system-icon.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Loader from 'components/Loader';

import TopPanelComponent from './TopPanelComponent';

import { ManageOrganizationsContext } from '../constants';
import messages from '../../../messages';

const HealthSystemSettings = () => {
  const { formatMessage } = useIntl();

  const {
    selectedEntity,
    organization,
    loaders: { fetchOrganization: fetchOrganizationLoader },
  } = useContext(ManageOrganizationsContext);

  const healthSystem = useMemo(() =>
    organization.healthSystems.find(({ id }) => id === selectedEntity.id),
  );

  if (!organization || fetchOrganizationLoader) return <Loader type="inline" />;

  return (
    <>
      <Row>
        <Col>
          <TopPanelComponent
            header={formatMessage(messages.healthSystemHeader)}
            icon={HealthSystemIcon}
            isDeleting={false}
            label={formatMessage(messages.healthSystemLabel)}
            name={healthSystem.name}
            onDelete={null}
            onEdit={null}
            placeholder={formatMessage(messages.healthSystemPlaceholder)}
          />
        </Col>
      </Row>
    </>
  );
};

HealthSystemSettings.propTypes = {};

const mapDispatchToProps = {};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default memo(compose(withConnect)(HealthSystemSettings));
