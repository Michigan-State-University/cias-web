import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';

import msuLogo from 'assets/svg/MSU-logo-1.svg';

const MSULogo = ({ logoUrl, ...cssProps }) => (
  <Img {...cssProps} maxHeight={100} maxWidth={200} src={logoUrl ?? msuLogo} />
);

MSULogo.propTypes = {
  logoUrl: PropTypes.string,
};

export default MSULogo;
