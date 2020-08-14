/**
 *
 * ShareBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Box from 'components/Box';
import H2 from 'components/H2';
import Row from 'components/Row';
import Selector from 'components/Selector';
import { colors, boxShadows, borders } from 'theme';
import CopyToClipboard from 'components/CopyToClipboard';

import messages from './messages';
import { shareOptions } from './utils';
import InterventionSelect from './Components/InterventionSelect';
import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';

const ShareBox = () => (
  <Box
    shadow={boxShadows.selago}
    bg={colors.white}
    height="100%"
    width="100%"
    my={18}
    ml={38}
  >
    <Box px={30} pt={22} pb={15}>
      <H2>
        <FormattedMessage {...messages.header} />
      </H2>
      <Row mt={20}>
        <Selector
          options={shareOptions}
          tooltipContent={
            <FormattedMessage {...messages.tooltipSelectorContent} />
          }
        />
      </Row>
      <Row mt={40}>
        <InterventionSelect />
      </Row>
      <Row mt={40}>
        <ParticipantInviter />
      </Row>
      <Row mt={15}>
        <UserList />
      </Row>
    </Box>
    <Row
      borderTop={`${borders.borderWidth} ${borders.borderStyle} ${
        colors.botticelli
      }`}
      py={18}
      px={30}
    >
      <CopyToClipboard textToCopy="eee">
        <FormattedMessage {...messages.copyLabel} />
      </CopyToClipboard>
    </Row>
  </Box>
);

ShareBox.propTypes = {};

export default ShareBox;
