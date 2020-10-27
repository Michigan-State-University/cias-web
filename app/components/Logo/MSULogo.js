import React from 'react';

import Img from 'components/Img';

import msuLogo from 'assets/svg/MSU-logo-1.svg';

const MSULogo = ({ ...cssProps }) => <Img {...cssProps} src={msuLogo} />;

export default MSULogo;
