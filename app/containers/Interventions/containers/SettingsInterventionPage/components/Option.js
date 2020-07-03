import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import Switch from 'components/Switch';
import { colors, borders } from 'theme';

const Option = ({ withBorder, fontWeight, label, value, action }) => {
  const handleToggle = val => {
    action(val);
  };
  return (
    <Row
      align="center"
      justify="between"
      pb={15}
      mb={15}
      borderBottom={
        withBorder
          ? `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`
          : null
      }
    >
      <Text fontWeight={fontWeight}>{label}</Text>
      <Switch checked={value} onToggle={handleToggle} />
    </Row>
  );
};

Option.propTypes = {
  withBorder: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.bool,
  action: PropTypes.func,
  index: PropTypes.string,
  refetchQuestions: PropTypes.func,
};

Option.defualtProps = {};

export default Option;
