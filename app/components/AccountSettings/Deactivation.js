import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import messages from './messages';

const Deactivation = ({ user: { deactivated }, changeStatus }) => (
  <Button
    color={deactivated ? 'primary' : 'warning'}
    onClick={() => changeStatus(!deactivated)}
  >
    <FormattedMessage {...messages[deactivated ? 'activate' : 'deactivate']} />
  </Button>
);

Deactivation.propTypes = {
  user: PropTypes.object,
  changeStatus: PropTypes.func,
};

export default Deactivation;
