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
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Markup } from 'interweave';

import Box from 'components/Box';
import Button from 'components/Button';
import ChipsInput from 'components/Input/ChipsInput';
import Column from 'components/Column';
import CsvFileReader from 'components/CsvFileReader';
import H2 from 'components/H2';
import Row from 'components/Row';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';

import { themeColors } from 'theme';
import { csvEmailValidator } from 'utils/validators/emailValidator';
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
import UserList from '../Components/UserList';

const AccessGiver = ({
  intl: { formatMessage },
  intervention: { id: interventionId, status, name },
  giveUserAccess,
  usersWithAccess,
  enableAccessLoading,
  fetchUserAccessLoading,
  fetchUsersWithAccess,
  revokeUserAccess,
  fetchUserAccessError,
  disabled,
}) => {
  const [value, setValue] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const addingParticipantsPossible = canAddParticipantsToIntervention(status);
  const removingParticipantsPossible =
    canRemoveParticipantsFromIntervention(status);

  useEffect(() => {
    fetchUsersWithAccess(interventionId);
  }, []);

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

    setValue(parsedData);
  };

  const inviteParticipants = () => {
    giveUserAccess(interventionId, value);
    setValue([]);
  };

  const revokeAction = (id) => {
    if (id) revokeUserAccess(interventionId, id);
  };

  const onIsValidLastValue = (isValid) => setDisableSubmit(!isValid);

  if (fetchUserAccessLoading)
    return (
      <Box mt={40}>
        <Spinner color={themeColors.secondary} />
      </Box>
    );

  const buttons = [
    {
      action: revokeAction,
      disabled: !removingParticipantsPossible || disabled,
      text: <FormattedMessage {...messages.remove} />,
    },
  ];

  const exportCsvButton = () => {
    if (usersWithAccess && usersWithAccess.length > 0)
      return (
        <Box mt={22}>
          <CsvFileExport
            filename={formatMessage(messages.filename, {
              interventionName: name,
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
          <Markup
            content={formatMessage(messages.accessGiverHeaderNote)}
            noWrap
          />
        </Text>
        <Column mt={20}>
          <ChipsInput
            disabled={!addingParticipantsPossible || disabled}
            value={value}
            setValue={setValue}
            placeholder={formatMessage(messages.inputPlaceholder)}
            onIsValid={onIsValidLastValue}
          />
          <Row mt={25} align="center" justify="between">
            <Box>
              <CsvFileReader
                disabled={!addingParticipantsPossible || disabled}
                onUpload={handleUploadCsv}
              >
                <FormattedMessage {...messages.uploadText} />
              </CsvFileReader>
              {exportCsvButton()}
            </Box>
            <Button
              onClick={inviteParticipants}
              disabled={(disableSubmit && isEmpty(value)) || disabled}
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
            userWithLoading={
              find(usersWithAccess, (user) => user.loading) || {}
            }
          />
          {enableAccessLoading && <Spinner color={themeColors.secondary} />}
        </Box>
      </Column>
    </Box>
  );
};

AccessGiver.propTypes = {
  intl: PropTypes.shape(IntlShape),
  intervention: PropTypes.object,
  giveUserAccess: PropTypes.func,
  fetchUsersWithAccess: PropTypes.func,
  revokeUserAccess: PropTypes.func,
  usersWithAccess: PropTypes.any,
  enableAccessLoading: PropTypes.bool,
  fetchUserAccessLoading: PropTypes.bool,
  fetchUserAccessError: PropTypes.string,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  giveUserAccess: enableUserAccessRequest,
  fetchUsersWithAccess: fetchUsersWithAccessRequest,
  revokeUserAccess: revokeUserAccessRequest,
};

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'accessGiverContainer',
  saga: accessGiverContainerSaga,
});

export default compose(withConnect, withSaga, injectIntl)(AccessGiver);
