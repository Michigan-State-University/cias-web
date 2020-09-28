import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import messages from './messages';

const Deactivation = ({ user: { active }, changeStatus }) => (
  <Button
    width={180}
    color={active ? 'warning' : 'primary'}
    onClick={() => changeStatus(!active)}
  >
    <FormattedMessage {...messages[active ? 'deactivate' : 'activate']} />
  </Button>
);

Deactivation.propTypes = {
  user: PropTypes.object,
  changeStatus: PropTypes.func,
};

export default Deactivation;
