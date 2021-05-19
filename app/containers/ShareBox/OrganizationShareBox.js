/**
 *
 * OrganizationShareBox
 *
 */
import Loader from 'components/Loader';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import filter from 'lodash/filter';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

import CopyToClipboard from 'components/CopyToClipboard';
import CsvFileExport from 'components/CsvFileExport';
import Row from 'components/Row';
import H3 from 'components/H3';

import { colors } from 'theme';
import { canShareWithParticipants } from 'models/Status/statusPermissions';
import {
  sendSessionInviteRequest,
  resendSessionInviteRequest,
  makeSelectInterventionLoader,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  makeSelectOrganization,
  fetchOrganizationRequest,
} from 'global/reducers/organizations';
import Tabs from 'components/Tabs';
import Box from 'components/Box';
import Select from 'components/Select';
import Button from 'components/Button';
import CsvFileReader from 'components/CsvFileReader';
import { emailValidator } from 'utils/validators';
import UserList from './Components/UserList';
import messages from './messages';
import { makeSelectCurrentSession } from './selectors';
import ShareBoxModalParent from './Components/ShareBoxModalParent';
import ClinicParticipantInviter from './Components/ClinicParticipantInviter';

const OrganizationShareBox = ({
  session,
  sendInvite,
  resendInvite,
  sendLoading,
  emailLoading,
  listLoading,
  interventionStatus,
  organizationId,
  organization,
  fetchOrganization,
}) => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [invitationArray, setInvitationArray] = useState([
    { emails: [], healthClinic: null },
  ]);

  const editInvitationObj = (invitationObj, index) => {
    const newArray = [...invitationArray];
    newArray[index] = invitationObj;
    if (newArray[newArray.length - 1].healthClinic !== null) {
      newArray.push({ emails: [], healthClinic: null });
    }
    setInvitationArray(newArray);
  };

  useEffect(() => {
    fetchOrganization(organizationId);
  }, []);

  const {
    name,
    emails,
    position,
    intervention_id: interventionId,
    id: sessionId,
  } = session || {};

  const link = useMemo(() => {
    if (!selectedClinic) return null;
    return `${process.env.WEB_URL}/interventions/${interventionId}/sessions/${
      session.id
    }/fill?cid=${selectedClinic.value}`;
  }, [selectedClinic]);

  const handleResend = id => resendInvite(id, session.id);

  const sharingPossible = canShareWithParticipants(interventionStatus);

  const buttons = [
    {
      action: handleResend,
      disabled: sharingPossible,
      text: <FormattedMessage {...messages.resend} />,
    },
  ];

  const exampleCSVData = useMemo(() => {
    if (!organization) return null;
    const data = [];
    const { healthSystems } = organization;
    healthSystems.forEach(({ name: healthSystemName, healthClinics }) => {
      healthClinics.forEach(({ name: healthClinicName, id }) => {
        data.push({
          email: '',
          healthClinicId: id,
          healthClinicName,
          healthSystemName,
        });
      });
    });
    return data;
  }, [organization]);

  const clinicSelectData = useMemo(() => {
    if (!organization) return null;
    const data = [];
    const { healthSystems } = organization;
    healthSystems.forEach(({ name: healthSystemName, healthClinics }) => {
      healthClinics.forEach(({ name: healthClinicName, id }) => {
        data.push({
          value: id,
          label: `${healthClinicName} (${healthSystemName})`,
        });
      });
    });
    return data;
  }, [organization]);

  const allClinicIds = useMemo(() => {
    if (!organization) return [];
    const data = [];
    const { healthSystems } = organization;
    healthSystems.forEach(({ healthClinics }) => {
      healthClinics.forEach(({ id }) => {
        data.push(id);
      });
    });
    return data;
  }, [organization]);

  const exportExampleCsvButton = () => (
    <Row mt={10}>
      <CsvFileExport
        filename={formatMessage(messages.exampleCsvFilename, {
          interventionName: name,
        })}
        data={exampleCSVData}
      >
        {formatMessage(messages.exportExampleCsv)}
      </CsvFileExport>
    </Row>
  );

  const handleUpload = data => {
    const parsedData = map(data, columns => {
      if (!columns || !columns.data) return null;

      const [email, healthClinicId] = columns.data;
      if (
        email &&
        emailValidator(email) &&
        allClinicIds.includes(healthClinicId)
      )
        return { email, healthClinicId };
      return null;
    });
    const filteredData = filter(parsedData, val => val !== null);
    const groupedData = groupBy(filteredData, 'healthClinicId');
    const outputData = map(groupedData, (groupObject, healthClinicId) => {
      const healthClinic = clinicSelectData.find(
        ({ value }) => value === healthClinicId,
      );
      return {
        healthClinic,
        emails: groupObject.map(({ email }) => email),
      };
    });
    setInvitationArray(outputData);
  };

  const importCsvButton = () => (
    <Row>
      <CsvFileReader disabled={!sharingPossible} onUpload={handleUpload}>
        {formatMessage(messages.uploadText)}
      </CsvFileReader>
    </Row>
  );

  const handleSend = () => {
    const invitationsFiltered = filter(
      invitationArray,
      ({ emails, healthClinic }) =>
        emails.length !== 0 && healthClinic !== null,
    );
    const invitationsMapped = map(
      invitationsFiltered,
      ({ emails, healthClinic: { value } }) => ({
        emails,
        health_clinic_id: value,
      }),
    );
    sendInvite(invitationsMapped, sessionId);
  };

  if (session) {
    return (
      <ShareBoxModalParent position={position} name={name}>
        <Box mt={20}>
          <Tabs>
            <div label={formatMessage(messages.inviteParticipant)}>
              {invitationArray.map((invitationObject, index) => (
                <ClinicParticipantInviter
                  invitation={invitationObject}
                  key={index}
                  selectClinics={clinicSelectData}
                  formatMessage={formatMessage}
                  updateInvitation={invitationObj =>
                    editInvitationObj(invitationObj, index)
                  }
                />
              ))}
              <Row dispay="flex" justify="center" align="center">
                <Box>
                  {importCsvButton()}
                  {exportExampleCsvButton()}
                </Box>
                <Button
                  disabled={!sharingPossible}
                  width="100%"
                  ml={12}
                  hoverable
                  alignSelf="start"
                  onClick={handleSend}
                  loading={sendLoading}
                  data-cy="send-email-button"
                >
                  <FormattedMessage {...messages.sendText} />
                </Button>
              </Row>
              <Box
                width="100%"
                pt={20}
                mt={20}
                borderTop={`1px solid ${colors.botticelli}`}
              />
              <H3 mb={20}>{formatMessage(messages.generateLink)}</H3>
              <Row display="flex" justify="between">
                <Select
                  width="100%"
                  selectProps={{
                    bg: colors.zirkon,
                    isDisabled:
                      !clinicSelectData || clinicSelectData.length === 0,
                    options: clinicSelectData,
                    value: selectedClinic,
                    onChange: setSelectedClinic,
                    placeholder: formatMessage(messages.selectClinicForLink),
                    noOptionsMessage: () => formatMessage(messages.notFound),
                  }}
                />
                <CopyToClipboard
                  buttonDisabled={!selectedClinic}
                  renderAsButton
                  textToCopy={link}
                />
              </Row>
            </div>
            <div
              label={formatMessage(messages.invitedParticipants, {
                invitedLength: 3,
              })}
            >
              {emails && emails.length !== 0 && (
                <>
                  {listLoading && <Loader type="inline" />}

                  <H3
                    mb={15}
                    fontSize={13}
                    fontWeight="bold"
                    color={colors.bluewood}
                    textOpacity={0.6}
                  >
                    <FormattedMessage {...messages.userListLabel} />
                  </H3>
                  <Row maxHeight={350} overflow="scroll" padding={10}>
                    <UserList
                      buttons={buttons}
                      users={emails}
                      userWithLoading={emailLoading}
                    />
                  </Row>
                </>
              )}
            </div>
          </Tabs>
        </Box>
      </ShareBoxModalParent>
    );
  }
  return null;
};

// {exportCsvButton()}

/*
  const exportCsvButton = () => {
    if (emails && emails.length > 0)
      return (
        <Row mt={22}>
          <CsvFileExport
            filename={formatMessage(messages.filename, {
              interventionName: name,
            })}
            data={emails.map(({ email }) => ({ email }))}
          >
            {formatMessage(messages.exportCsv)}
          </CsvFileExport>
        </Row>
      );
  };
*/
OrganizationShareBox.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  sendInvite: PropTypes.func,
  resendInvite: PropTypes.func,
  fetchOrganization: PropTypes.func,
  sendLoading: PropTypes.bool,
  listLoading: PropTypes.bool,
  emailLoading: PropTypes.object,
  interventionStatus: PropTypes.string,
  organizationId: PropTypes.string,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectCurrentSession(),
  sendLoading: makeSelectInterventionLoader('sendSessionLoading'),
  listLoading: makeSelectInterventionLoader('fetchSessionEmailsLoading'),
  emailLoading: makeSelectInterventionLoader('sessionEmailLoading'),
  interventionStatus: makeSelectInterventionStatus(),
  organization: makeSelectOrganization(),
});

const mapDispatchToProps = {
  sendInvite: sendSessionInviteRequest,
  resendInvite: resendSessionInviteRequest,
  fetchOrganization: fetchOrganizationRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(OrganizationShareBox);
