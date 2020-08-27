import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Img from 'components/Img';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Text from 'components/Text';
import addSign from 'assets/svg/addSign.svg';
import { themeColors, colors } from 'theme';

import messages from './messages';

const ButtonComponent = ({ onClick, loading }) => (
  <Row
    width={250}
    bg={themeColors.secondary}
    px={15}
    align="center"
    borderRadius={5}
    clickable
    onClick={onClick}
    height={64}
  >
    {loading ? (
      <Loader type="inline" color={colors.white} size={40} />
    ) : (
      <Fragment>
        <Img src={addSign} alt="add" mr={15} />
        <Text fontSize={15} color={colors.white}>
          <FormattedMessage {...messages.addFirstScreen} />
        </Text>
      </Fragment>
    )}
  </Row>
);

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default ButtonComponent;
