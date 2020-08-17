import React, { useState } from 'react';
import filter from 'lodash/filter';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import Button from 'components/Button';
import ChipsInput from 'containers/ShareBox/Components/ChipsInput';
import Column from 'components/Column';
import CsvFileReader from 'components/CsvFileReader';
import H2 from 'components/H2';
import Row from 'components/Row';
import UserList from 'containers/ShareBox/Components/UserList';
import { validEmailRegExp } from 'containers/ShareBox/utils';

import messages from '../messages';

const AccessGiver = ({ intl: { formatMessage } }) => {
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
    <Box mt={65}>
      <Column>
        <H2>
          <FormattedMessage {...messages.accessGiverHeader} />
        </H2>
        <Row mt={20} align="center">
          <ChipsInput
            value={value}
            setValue={setValue}
            placeholder={formatMessage(messages.inputPlaceholder)}
          />
          <Row mt={-5} align="center" alignSelf="start">
            <Box ml={30}>
              <CsvFileReader onUpload={handleUploadCsv}>
                <FormattedMessage {...messages.uploadText} />
              </CsvFileReader>
            </Box>
            <Button disabled={isEmpty(value)} width={180} ml={20} hoverable>
              <FormattedMessage {...messages.sendText} />
            </Button>
          </Row>
        </Row>
        <Box mt={40}>
          <UserList buttonIsClose buttonText={formatMessage(messages.remove)} />
        </Box>
      </Column>
    </Box>
  );
};

AccessGiver.propTypes = {
  intl: intlShape,
};

export default injectIntl(AccessGiver);
