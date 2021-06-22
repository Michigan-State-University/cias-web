import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import msuLogo from 'assets/svg/MSU-logo-1.svg';

import Img from 'components/Img';

import messages from './messages';

const MSULogo = ({ logoUrl, imageAlt, ...cssProps }) => {
  const { formatMessage } = useIntl();

  return (
    <Img
      {...cssProps}
      maxHeight={100}
      maxWidth={200}
      src={logoUrl ?? msuLogo}
      alt={imageAlt ?? formatMessage(messages.defaultMSULogoAlt)}
    />
  );
};

MSULogo.propTypes = {
  logoUrl: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default memo(MSULogo);
