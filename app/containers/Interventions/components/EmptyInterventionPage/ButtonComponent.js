import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import Button from 'components/Button';
import addSign from 'assets/svg/addSign.svg';
import addSignDisabled from 'assets/svg/addSign-disabled.svg';
import { colors } from 'theme';

import messages from './messages';

const ButtonComponent = React.forwardRef(
  ({ onClick, loading, disabled }, ref) => (
    <Button
      color="secondary"
      onClick={onClick}
      ref={ref}
      loading={loading}
      width={250}
      height={64}
      borderRadius={5}
      disabled={disabled}
    >
      <Row justify="center" align="center">
        <Img src={disabled ? addSignDisabled : addSign} alt="add" mr={15} />
        <Text fontSize={15} color={colors.white}>
          <FormattedMessage {...messages.addFirstScreen} />
        </Text>
      </Row>
    </Button>
  ),
);

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ButtonComponent;
