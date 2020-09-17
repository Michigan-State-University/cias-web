import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import Button from 'components/Button';
import ChipsInput from 'containers/ShareBox/Components/ChipsInput';
import Column from 'components/Column';
import CsvFileReader from 'components/CsvFileReader';
import H2 from 'components/H2';
import Row from 'components/Row';
import UserList from 'containers/ShareBox/Components/UserList';

import { emailValidator } from 'utils/validators/emailValidator';
import {
  enableUserAccessRequest,
  fetchUsersWithAccessRequest,
  revokeUserAccessRequest,
} from 'global/reducers/problem';

import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import ErrorAlert from 'components/ErrorAlert';
import { accessGiverContainerSaga } from '../sagas';
import messages from '../messages';

const AccessGiver = ({
  intl: { formatMessage },
  problemId,
  giveUserAccess,
  usersWithAccess,
  enableAccessLoading,
  fetchUserAccessLoading,
  fetchUsersWithAccess,
  revokeUserAccess,
  fetchUserAccessError,
}) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetchUsersWithAccess(problemId);
  }, []);

  const handleUploadCsv = data => {
    const parsedData = uniq(
      filter(
        map(data, columns => {
          const email = head(columns.data);
          if (email && emailValidator.isValidSync(email)) return email;
          return null;
        }),
        val => val !== null,
      ),
    );

    setValue(parsedData);
  };

  const inviteParticipants = () => {
    giveUserAccess(problemId, value);
    setValue([]);
  };

  const revokeAction = user => {
    const { id } = user;
    if (id) revokeUserAccess(problemId, id);
  };

  if (fetchUserAccessLoading)
    return (
      <Box mt={65}>
        <Spinner color={themeColors.secondary} />
      </Box>
    );

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
            <Button
              onClick={inviteParticipants}
              disabled={isEmpty(value)}
              width={180}
              ml={20}
              hoverable
            >
              <FormattedMessage {...messages.sendText} />
            </Button>
          </Row>
        </Row>
        <Box mt={40}>
          {fetchUserAccessError && (
            <ErrorAlert
              errorText={formatMessage(messages.usersWithAccessError)}
            />
          )}
          <UserList
            users={usersWithAccess || []}
            buttonIsClose
            buttonText={formatMessage(messages.remove)}
            buttonAction={revokeAction}
            userWithLoading={find(usersWithAccess, user => user.loading) || {}}
          />
          {enableAccessLoading && <Spinner color={themeColors.secondary} />}
        </Box>
      </Column>
    </Box>
  );
};

AccessGiver.propTypes = {
  intl: intlShape,
  problemId: PropTypes.string,
  giveUserAccess: PropTypes.func,
  fetchUsersWithAccess: PropTypes.func,
  revokeUserAccess: PropTypes.func,
  usersWithAccess: PropTypes.any,
  enableAccessLoading: PropTypes.bool,
  fetchUserAccessLoading: PropTypes.bool,
  fetchUserAccessError: PropTypes.string,
};

const mapDispatchToProps = {
  giveUserAccess: enableUserAccessRequest,
  fetchUsersWithAccess: fetchUsersWithAccessRequest,
  revokeUserAccess: revokeUserAccessRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'accessGiverContainer',
  saga: accessGiverContainerSaga,
});

export default compose(
  withConnect,
  withSaga,
  injectIntl,
)(AccessGiver);
