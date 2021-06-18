import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import logo from 'assets/svg/logo.svg';

import Img from 'components/Img';

import messages from './messages';

const CIASLogo = ({ logoUrl, ...cssProps }) => {
  const { formatMessage } = useIntl();
  return (
    <Img
      {...cssProps}
      src={logo}
      alt={formatMessage(messages.defaultCIASLogoAlt)}
    />
  );
};

CIASLogo.propTypes = {
  logoUrl: PropTypes.string,
};

export default memo(CIASLogo);
