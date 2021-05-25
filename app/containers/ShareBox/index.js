/**
 *
 * ShareBox
 *
 */
import Loader from 'components/Loader';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

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

import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';
import messages from './messages';
import { makeSelectCurrentSession } from './selectors';
import ShareBoxModalParent from './Components/ShareBoxModalParent';

const ShareBox = ({
  session,
  sendInvite,
  resendInvite,
  sendLoading,
  emailLoading,
  listLoading,
  interventionStatus,
}) => {
  const { name, intervention_id: interventionId, emails, position } =
    session || {};

  const handleResend = id => resendInvite(id, session.id);

  const sharingPossible = canShareWithParticipants(interventionStatus);

  const buttons = [
    {
      action: handleResend,
      disabled: sharingPossible,
      text: <FormattedMessage {...messages.resend} />,
    },
  ];

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
  if (session) {
    const link = `${
      process.env.WEB_URL
    }/interventions/${interventionId}/sessions/${session.id}/fill`;
    return (
      <ShareBoxModalParent position={position} name={name}>
        <Row mt={20}>
          <ParticipantInviter
            disabled={!sharingPossible}
            loading={sendLoading}
            sendInvite={value => sendInvite(value, session.id)}
          />
        </Row>
        {exportCsvButton()}
        <Row mt={15}>
          <CopyToClipboard textToCopy={link}>
            <FormattedMessage {...messages.copyLabel} />
          </CopyToClipboard>
        </Row>
        {listLoading && <Loader type="inline" />}
        {emails && emails.length !== 0 && (
          <>
            <H3
              mt={40}
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
      </ShareBoxModalParent>
    );
  }
  return null;
};

ShareBox.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  sendInvite: PropTypes.func,
  resendInvite: PropTypes.func,
  sendLoading: PropTypes.bool,
  listLoading: PropTypes.bool,
  emailLoading: PropTypes.object,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectCurrentSession(),
  sendLoading: makeSelectInterventionLoader('sendSessionLoading'),
  listLoading: makeSelectInterventionLoader('fetchSessionEmailsLoading'),
  emailLoading: makeSelectInterventionLoader('sessionEmailLoading'),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  sendInvite: sendSessionInviteRequest,
  resendInvite: resendSessionInviteRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(ShareBox);
