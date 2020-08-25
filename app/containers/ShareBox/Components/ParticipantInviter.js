import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Button from 'components/Button';
import Column from 'components/Column';
import Row from 'components/Row';
import CsvFileReader from 'components/CsvFileReader';

import messages from '../messages';
import ChipsInput from './ChipsInput';
import { validEmailRegExp } from '../utils';

const ParticipantInviter = ({ intl: { formatMessage } }) => {
  const [value, setValue] = useState([]);

  const handleUploadCsv = data => {
    const parsedData = uniq(
      filter(
        map(data, columns => {
          const email = head(columns.data);
          if (email && validEmailRegExp.test(email)) return email;
          return null;
        }),
        val => val !== null,
      ),
    );
    setValue(parsedData);
  };

  return (
    <Column>
      <Row align="center" justify="between">
        <ChipsInput
          value={value}
          setValue={setValue}
          placeholder={formatMessage(messages.emailPlaceholder)}
        />
        <Button
          disabled={isEmpty(value)}
          width={140}
          ml={12}
          hoverable
          alignSelf="start"
        >
          <FormattedMessage {...messages.sendText} />
        </Button>
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
  intl: intlShape,
};

export default injectIntl(ParticipantInviter);
