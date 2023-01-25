import React, { memo, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  editInterventionRequest,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import { makeSelectOrganizations } from 'global/reducers/organizations';
import globalMessages from 'global/i18n/globalMessages';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';
import Text from 'components/Text';
import Button from 'components/Button';

import { organizationSelectOptionFormatter } from './utils';
import messages from './messages';
import {
  CHOOSE_ORGANIZATION_LABEL_ID,
  INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH,
} from './constants';

const InterventionAssignOrganizationModal = ({
  interventionId,
  organizationId,
  onClose,
}) => {
  const { formatMessage } = useIntl();

  // redux
  const dispatch = useDispatch();

  // selectors
  const organizations = useSelector(makeSelectOrganizations());
  const editInterventionLoader = useSelector(
    makeSelectInterventionLoader('editIntervention'),
  );

  // actions
  const editIntervention = (intervention) =>
    dispatch(editInterventionRequest(intervention));

  const { name: currentOrganizationName } =
    organizations.find(({ id }) => id === organizationId) ?? {};

  const generateSelectedValueObject = (orgId, orgName) =>
    orgId
      ? {
          value: orgId,
          label: orgName,
        }
      : null;

  const [selectedValue, setSelectedValue] = useState(
    generateSelectedValueObject(organizationId, currentOrganizationName),
  );

  useEffect(() => {
    setSelectedValue(
      generateSelectedValueObject(organizationId, currentOrganizationName),
    );
  }, [organizationId, currentOrganizationName]);

  const canSave = organizationId !== selectedValue?.value;

  const handleSave = useCallback(() => {
    editIntervention({
      id: interventionId,
      organizationId: selectedValue?.value ?? null,
    });
    onClose();
  }, [selectedValue?.value, interventionId]);

  const dataParser = useCallback(
    (data) => jsonApiToArray(data, 'organization'),
    [],
  );

  const onSelect = (value) => {
    if (value) setSelectedValue(value);
    else setSelectedValue(null);
  };

  return (
    <FullWidthContainer>
      <Text mt={8}>{formatMessage(messages.shortLinksInfo)}</Text>

      <Row align="center" mt={20}>
        <Col xs={4}>
          <Text fontWeight="bold" id={CHOOSE_ORGANIZATION_LABEL_ID}>
            {formatMessage(messages.assignOrganizationSelectLabel)}
          </Text>
        </Col>

        <Col xs={8}>
          <ApiSelect
            url="/v1/organizations"
            dataParser={dataParser}
            optionsFormatter={organizationSelectOptionFormatter}
            selectProps={{
              onChange: onSelect,
              value: selectedValue,
              isClearable: true,
              'aria-labelledby': CHOOSE_ORGANIZATION_LABEL_ID,
            }}
            width="100%"
          />
        </Col>
      </Row>

      <Row mt={30}>
        <Col>
          <Button
            onClick={handleSave}
            disabled={!canSave}
            loading={editInterventionLoader}
          >
            {formatMessage(globalMessages.save)}
          </Button>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

InterventionAssignOrganizationModal.propTypes = {
  interventionId: PropTypes.string,
  organizationId: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(InterventionAssignOrganizationModal);
export { INTERVENTION_ASSIGN_ORGANIZATION_MODAL_WIDTH };
