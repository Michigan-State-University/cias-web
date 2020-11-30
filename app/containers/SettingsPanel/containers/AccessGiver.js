import CsvFileExport from 'components/CsvFileExport';
import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  FormattedHTMLMessage,
} from 'react-intl';

import Box from 'components/Box';
import Button from 'components/Button';
import ChipsInput from 'containers/ShareBox/Components/ChipsInput';
import Column from 'components/Column';
import CsvFileReader from 'components/CsvFileReader';
import H2 from 'components/H2';
import Row from 'components/Row';
import UserList from 'containers/ShareBox/Components/UserList';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import { themeColors } from 'theme';
import { emailValidator } from 'utils/validators/emailValidator';
import { injectSaga } from 'redux-injectors';
import {
  enableUserAccessRequest,
  fetchUsersWithAccessRequest,
  revokeUserAccessRequest,
} from 'global/reducers/intervention';
import {
  canAddParticipantsToIntervention,
  canRemoveParticipantsFromIntervention,
} from 'models/Status/statusPermissions';

import Text from 'components/Text';
import { accessGiverContainerSaga } from '../sagas';
import messages from '../messages';

const AccessGiver = ({
  intl: { formatMessage },
  problem: { id: problemId, status, name },
  giveUserAccess,
  usersWithAccess,
  enableAccessLoading,
  fetchUserAccessLoading,
  fetchUsersWithAccess,
  revokeUserAccess,
  fetchUserAccessError,
}) => {
  const [value, setValue] = useState([]);

  const addingParticipantsPossible = canAddParticipantsToIntervention(status);
  const removingParticipantsPossible = canRemoveParticipantsFromIntervention(
    status,
  );

  useEffect(() => {
    fetchUsersWithAccess(problemId);
  }, []);

  const handleUploadCsv = data => {
    const parsedData = uniq(
      filter(
        map(data, columns => {
          const email = head(columns.data);
          if (email && emailValidator(email)) return email;
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

  const revokeAction = id => {
    if (id) revokeUserAccess(problemId, id);
  };

  if (fetchUserAccessLoading)
    return (
      <Box mt={40}>
        <Spinner color={themeColors.secondary} />
      </Box>
    );

  const buttons = [
    {
      action: revokeAction,
      disabled: removingParticipantsPossible,
      text: <FormattedMessage {...messages.remove} />,
    },
  ];

  const exportCsvButton = () => {
    if (usersWithAccess && usersWithAccess.length > 0)
      return (
        <Box mt={22}>
          <CsvFileExport
            filename={formatMessage(messages.filename, {
              problemName: name,
            })}
            data={usersWithAccess.map(({ email }) => ({ email }))}
          >
            {formatMessage(messages.exportCsv)}
          </CsvFileExport>
        </Box>
      );
  };

  return (
    <Box mt={40}>
      <Column>
        <H2>
          <FormattedMessage {...messages.accessGiverHeader} />
        </H2>
        <Text>
          <FormattedHTMLMessage {...messages.accessGiverHeaderNote} />
        </Text>
        <Column mt={20}>
          <ChipsInput
            disabled={!addingParticipantsPossible}
            value={value}
            setValue={setValue}
            placeholder={formatMessage(messages.inputPlaceholder)}
          />
          <Row mt={25} align="center" justify="between">
            <Box>
              <CsvFileReader
                disabled={!addingParticipantsPossible}
                onUpload={handleUploadCsv}
              >
                <FormattedMessage {...messages.uploadText} />
              </CsvFileReader>
              {exportCsvButton()}
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
        </Column>
        <Box mt={40}>
          {fetchUserAccessError && (
            <ErrorAlert
              errorText={formatMessage(messages.usersWithAccessError)}
            />
          )}
          <UserList
            buttons={buttons}
            users={usersWithAccess || []}
            buttonIsClose
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
  problem: PropTypes.object,
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
