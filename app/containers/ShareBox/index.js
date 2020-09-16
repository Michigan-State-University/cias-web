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

import { colors, boxShadows } from 'theme';
import {
  sendInterventionInviteRequest,
  resendInterventionInviteRequest,
  makeSelectProblemLoader,
} from 'global/reducers/problem';

import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';
import messages from './messages';
import { makeSelectCurrenIntervention } from './selectors';

const ShareBox = ({
  intervention,
  sendInvite,
  resendInvite,
  sendLoading,
  resendLoading,
}) => {
  const { problem_id: problemId, slug, emails } = intervention || {};

  if (intervention) {
    const link = `${
      process.env.WEB_URL
    }/interventions/${problemId}/sessions/${slug}/fill`;
    return (
      <Box
        shadow={boxShadows.selago}
        bg={colors.white}
        height="fit-content"
        width="100%"
        px={30}
        pt={22}
        pb={15}
      >
        <H3
          mb={15}
          fontSize={13}
          fontWeight="bold"
          textOpacity={0.6}
          color={colors.bluewood}
        >
          <FormattedMessage {...messages.header} />
        </H3>
        <H2>{intervention.name}</H2>
        <Row mt={20}>
          <ParticipantInviter loading={sendLoading} sendInvite={sendInvite} />
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
            buttonAction={resendInvite}
            emails={emails}
            resendLoading={resendLoading}
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
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectCurrenIntervention(),
  sendLoading: makeSelectProblemLoader('sendInterventionLoading'),
  resendLoading: makeSelectProblemLoader('resendInterventionLoading'),
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
