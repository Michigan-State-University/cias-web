import React, { memo, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  editInterventionRequest,
  makeSelectIntervention,
} from 'global/reducers/intervention';

import { Col, FullWidthContainer, Row } from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';
import Text from 'components/Text';

import { languageSelectOptionFormatter } from './utils';
import messages from '../../messages';

const InterventionSettingsModal = () => {
  // redux
  const dispatch = useDispatch();

  // selectors
  const { id, languageCode, languageName } = useSelector(
    makeSelectIntervention(),
  );

  // actions
  const editIntervention = intervention =>
    dispatch(editInterventionRequest(intervention));

  const { formatMessage } = useIntl();
  const [selectedValue, setSelectedValue] = useState({
    value: languageCode,
    label: languageName,
  });

  useEffect(() => {
    setSelectedValue({
      value: languageCode,
      label: languageName,
    });
  }, [languageCode, languageName]);

  const handleLanguageChange = useCallback(
    ({ value, label, googleLanguageId }) =>
      editIntervention({
        id,
        languageCode: value,
        languageName: label,
        googleLanguageId,
      }),
    [id],
  );

  return (
    <FullWidthContainer>
      <Row align="center">
        <Col>
          <Text fontWeight="bold">
            {formatMessage(messages.interventionSettingsLanguageLabel)}
          </Text>
        </Col>
        <Col>
          <ApiSelect
            url="/v1/google/languages"
            dataParser={data => jsonApiToArray(data, 'supportedLanguage')}
            optionsFormatter={languageSelectOptionFormatter}
            selectProps={{
              onChange: handleLanguageChange,
              value: selectedValue,
            }}
            width="100%"
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

export default memo(InterventionSettingsModal);
