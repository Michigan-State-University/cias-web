import React, { memo, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { injectReducer, injectSaga } from 'redux-injectors';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  editInterventionRequest,
  interventionReducer,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import { makeSelectOrganizations } from 'global/reducers/organizations';

import interventionDetailsPageSagas from 'containers/InterventionDetailsPage/saga';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';
import Text from 'components/Text';

import Button from 'components/Button';
import { compose } from 'redux';
import { organizationSelectOptionFormatter } from './utils';
import messages from '../../messages';

const InterventionAssignOrganizationModal = ({
  interventionId,
  organizationId,
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
  const editIntervention = intervention =>
    dispatch(editInterventionRequest(intervention));

  const { name: currentOrganizationName } =
    organizations.find(({ id }) => id === organizationId) ?? {};

  const [selectedValue, setSelectedValue] = useState({
    value: organizationId,
    label: currentOrganizationName,
  });

  useEffect(() => {
    setSelectedValue({
      value: organizationId,
      label: currentOrganizationName,
    });
  }, [organizationId, currentOrganizationName]);

  const canSave = organizationId !== selectedValue.value;

  const handleSave = useCallback(
    () =>
      editIntervention({
        id: interventionId,
        organizationId: selectedValue.value,
      }),
    [selectedValue.value, interventionId],
  );

  const dataParser = useCallback(
    data => jsonApiToArray(data, 'organization'),
    [],
  );

  const onSelect = value => {
    if (value) setSelectedValue(value);
    else
      setSelectedValue({
        value: null,
        label: null,
      });
  };

  return (
    <FullWidthContainer>
      <Row align="center" mt={20}>
        <Col xs={4}>
          <Text fontWeight="bold">
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
            {formatMessage(messages.saveButton)}
          </Button>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

InterventionAssignOrganizationModal.propTypes = {
  interventionId: PropTypes.string,
  organizationId: PropTypes.string,
};

export default compose(
  memo,
  injectSaga({
    key: 'interventionDetailsPageSagas',
    saga: interventionDetailsPageSagas,
  }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
)(InterventionAssignOrganizationModal);
