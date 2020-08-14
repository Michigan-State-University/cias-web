import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import Column from 'components/Column';
import Row from 'components/Row';
import CsvFileReader from 'components/CsvFileReader';
import csvFileIcon from 'assets/svg/csv-file.svg';

import messages from '../messages';
import ChipsInput from './ChipsInput';
import { validEmailRegExp } from '../utils';

const ParticipantInviter = () => {
  const [value, setValue] = useState('');

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

    const string = parsedData.join(',');
    setValue(string);
  };

  return (
    <Column>
      <Row align="center" justify="between">
        <ChipsInput value={value} setValue={setValue} />
        <Button disabled={!value} heigh={25} width={140} ml={12} hoverable>
          <FormattedMessage {...messages.sendText} />
        </Button>
      </Row>
      <Column mt={12}>
        <Row>
          <CsvFileReader icon={csvFileIcon} onUpload={handleUploadCsv}>
            <FormattedMessage {...messages.uploadText} />
          </CsvFileReader>
        </Row>
      </Column>
    </Column>
  );
};

ParticipantInviter.propTypes = {};

export default ParticipantInviter;
