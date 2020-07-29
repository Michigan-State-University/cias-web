import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import CloseIcon from 'components/CloseIcon';

const DefaultNavbar = ({ navbarName }) => (
  <Fragment>
    <CloseIcon to="/" />
    <Text color="black" fontSize={23}>
      {navbarName}
    </Text>
  </Fragment>
);

DefaultNavbar.propTypes = {
  navbarName: PropTypes.string,
};

export default DefaultNavbar;
