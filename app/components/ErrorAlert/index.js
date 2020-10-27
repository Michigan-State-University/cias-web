/**
 *
 * ErrorAlert
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';

import Row from 'components/Row';
import Img from 'components/Img';
import Text from 'components/Text';
import exclamationMark from 'assets/svg/exclamationMark.svg';

import { AlertContainer } from './styled';

const ErrorAlert = ({ errorText, fullPage, ...restProps }) => {
  const toDisplay = errorText.toString().split('\n')[0];

  const wrapWithRow = child => (
    <Row width="100%" justify="center" mt={100}>
      {child}
    </Row>
  );

  const wrapper = fullPage ? wrapWithRow : identity;
  return wrapper(
    <AlertContainer {...restProps}>
      <Img src={exclamationMark} alt="error" mr={15} />
      <Text fontWeight="bold" fontSize={15}>
        {toDisplay}
      </Text>
    </AlertContainer>,
  );
};

ErrorAlert.propTypes = {
  errorText: PropTypes.node.isRequired,
  fullPage: PropTypes.bool,
};

export default memo(ErrorAlert);
