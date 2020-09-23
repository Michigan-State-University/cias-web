import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { colors } from 'theme';
import TextButton from 'components/Button/TextButton';
import messages from './messages';

const Deactivation = ({ user: { deactivated }, changeStatus }) => (
  <TextButton
    buttonProps={{
      color: deactivated ? colors.jungleGreen : colors.red,
    }}
    onClick={() => changeStatus(!deactivated)}
  >
    <FormattedMessage {...messages[deactivated ? 'activate' : 'deactivate']} />
  </TextButton>
);

Deactivation.propTypes = {
  user: PropTypes.object,
  changeStatus: PropTypes.func,
};

export default Deactivation;
