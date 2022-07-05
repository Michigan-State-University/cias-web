import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

import { csvEmailValidator } from 'utils/validators/emailValidator';

import Button from 'components/Button';
import Column from 'components/Column';
import Row from 'components/Row';
import CsvFileReader from 'components/CsvFileReader';
import Box from 'components/Box';

import ChipsInput from '../../../components/Input/ChipsInput';
import messages from '../messages';

const ParticipantInviter = ({
  intl: { formatMessage },
  sendInvite,
  loading,
  disabled,
  shareBoxType,
}) => {
  const [emails, setEmails] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleUploadCsv = (data) => {
    const parsedData = uniq(
      filter(
        map(data, (columns) => {
          const email = head(columns.data);
          if (email && csvEmailValidator(email)) return email;
          return null;
        }),
        (val) => val !== null,
      ),
    );
    setEmails(parsedData);
  };

  const handleSend = () => {
    sendInvite(emails);
    setEmails([]);
  };

  const onIsValidLastValue = (isValid) => setDisableSubmit(!isValid);

  return (
    <Column>
      <Row align="center" justify="between">
        <ChipsInput
          value={emails}
          setValue={setEmails}
          placeholder={formatMessage(messages.emailPlaceholder, {
            type: shareBoxType,
          })}
          onIsValid={onIsValidLastValue}
        />
        <Box width={140}>
          <Button
            disabled={disabled || (isEmpty(emails) && disableSubmit)}
            width={140}
            ml={12}
            hoverable
            alignSelf="start"
            onClick={handleSend}
            loading={loading}
            data-cy="send-email-button"
          >
            <FormattedMessage {...messages.sendText} />
          </Button>
        </Box>
      </Row>
      <Column mt={12}>
        <Row>
          <CsvFileReader onUpload={handleUploadCsv}>
            <FormattedMessage {...messages.uploadText} />
          </CsvFileReader>
        </Row>
      </Column>
    </Column>
  );
};

ParticipantInviter.propTypes = {
  intl: PropTypes.shape(IntlShape),
  sendInvite: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  shareBoxType: PropTypes.string,
};

export default injectIntl(ParticipantInviter);
