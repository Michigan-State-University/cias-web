/**
 *
 * ShareBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import CopyToClipboard from 'components/CopyToClipboard';
import H2 from 'components/H2';
import Row from 'components/Row';
import H3 from 'components/H3';

import { colors } from 'theme';
import {
  sendInterventionInviteRequest,
  resendInterventionInviteRequest,
  makeSelectProblemLoader,
  makeSelectProblemStatus,
} from 'global/reducers/problem';
import { canShareWithParticipants } from 'models/Status/statusPermissions';

import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';
import messages from './messages';
import { makeSelectCurrenIntervention } from './selectors';
import { InterventionIndex } from './styled';

const ShareBox = ({
  intervention,
  sendInvite,
  resendInvite,
  sendLoading,
  resendLoading,
  problemStatus,
}) => {
  const { problem_id: problemId, slug, emails, position } = intervention || {};

  const handleResend = user => resendInvite([user.email], intervention.id);

  const sharingPossible = canShareWithParticipants(problemStatus);

  if (intervention) {
    const link = `${
      process.env.WEB_URL
    }/interventions/${problemId}/sessions/${slug}/fill`;
    return (
      <Box height="fit-content" width={500} mt={20}>
        <Box display="flex" align="center">
          <InterventionIndex>{position}</InterventionIndex>
          <H2 ml={10}>{intervention.name}</H2>
        </Box>
        <Row mt={20}>
          <ParticipantInviter
            disabled={!sharingPossible}
            loading={sendLoading}
            sendInvite={value => sendInvite(value, intervention.id)}
          />
        </Row>
        <Row mt={15}>
          <CopyToClipboard textToCopy={link}>
            <FormattedMessage {...messages.copyLabel} />
          </CopyToClipboard>
        </Row>
        {emails && emails.length !== 0 && (
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
        )}
        <Row maxHeight={350} overflow="scroll" padding={10}>
          <UserList
            buttonText={<FormattedMessage {...messages.resend} />}
            buttonAction={handleResend}
            users={emails.map(email => ({ email }))}
            userWithLoading={{ email: resendLoading.email }}
          />
        </Row>
      </Box>
    );
  }
  return null;
};

ShareBox.propTypes = {
  intervention: PropTypes.shape({
    name: PropTypes.string,
  }),
  sendInvite: PropTypes.func,
  resendInvite: PropTypes.func,
  sendLoading: PropTypes.bool,
  resendLoading: PropTypes.object,
  problemStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectCurrenIntervention(),
  sendLoading: makeSelectProblemLoader('sendInterventionLoading'),
  resendLoading: makeSelectProblemLoader('resendInterventionLoading'),
  problemStatus: makeSelectProblemStatus(),
});

const mapDispatchToProps = {
  sendInvite: sendInterventionInviteRequest,
  resendInvite: resendInterventionInviteRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(ShareBox);
