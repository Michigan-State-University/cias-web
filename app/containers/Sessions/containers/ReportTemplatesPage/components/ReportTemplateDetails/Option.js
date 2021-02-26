import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import Switch from 'components/Switch';
import { colors, borders } from 'theme';

const Option = ({ withBorder, fontWeight, label, value, action, disabled }) => {
  const handleToggle = val => {
    action(val);
  };
  return (
    <Row
      align="center"
      justify="between"
      borderBottom={
        withBorder
          ? `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`
          : null
      }
    >
      <Text fontWeight={fontWeight} mr={10}>
        {label}
      </Text>
      <Switch disabled={disabled} checked={value} onToggle={handleToggle} />
    </Row>
  );
};

Option.propTypes = {
  withBorder: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.bool,
  action: PropTypes.func,
  fontWeight: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Option;
