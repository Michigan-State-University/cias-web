import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import Switch from 'components/Switch';
import { colors, borders } from 'theme';

const Option = ({
  withBorder,
  label,
  value,
  action,
  index,
  refetchQuestions,
}) => {
  const handleToggle = val => {
    action({ path: `settings.narrator.${index}`, value: val });
    refetchQuestions();
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
      <Text>{label}</Text>
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
