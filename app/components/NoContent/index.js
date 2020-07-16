import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import H2 from 'components/H2';
import noContent from 'assets/svg/no-content.svg';
import { colors } from 'theme';

import messages from './messages';

const NoContent = ({ image, text, alt }) => (
  <Box
    width="100%"
    minWidth="max-content"
    height="100%"
    display="flex"
    justify="center"
    align="center"
    borderRadius="0"
    data-testid="no-content"
  >
    <Column align="center">
      <Img src={image} alt={alt} />
      <H2 color={colors.greyishBlue} mt={15}>
        {text}
      </H2>
    </Column>
  </Box>
);

NoContent.propTypes = {
  image: PropTypes.string,
  text: PropTypes.node,
  alt: PropTypes.string,
};

NoContent.defaultProps = {
  image: noContent,
  text: <FormattedMessage {...messages.defaultText} />,
  alt: 'No content',
};

export default NoContent;
