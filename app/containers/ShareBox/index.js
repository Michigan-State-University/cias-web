/**
 *
 * ShareBox
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import CopyToClipboard from 'components/CopyToClipboard';
import H2 from 'components/H2';
import Row from 'components/Row';
import H3 from 'components/H3';
import Selector from 'components/Selector';
import { colors, boxShadows } from 'theme';

import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';
import messages from './messages';
import { makeSelectCurrenIntervention } from './selectors';
import { shareOptions } from './utils';

const ShareBox = ({ intervention }) => {
  if (intervention) {
    const link = `${process.env.WEB_URL}/interventions/${
      intervention.problem_id
    }/sessions/${intervention.slug}/fill`;
    return (
      <Fragment>
        <Box mb={25} width="fit-content">
          <Selector
            options={shareOptions}
            tooltipContent={
              <FormattedMessage {...messages.tooltipSelectorContent} />
            }
          />
        </Box>
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
            <ParticipantInviter />
          </Row>
          <Row mt={15}>
            <CopyToClipboard textToCopy={link}>
              <FormattedMessage {...messages.copyLabel} />
            </CopyToClipboard>
          </Row>
          <Row mt={40}>
            <UserList />
          </Row>
        </Box>
      </Fragment>
    );
  }
  return null;
};

ShareBox.propTypes = {
  intervention: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectCurrenIntervention(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ShareBox);
