import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Row from 'components/Row';
import { themeColors } from 'theme';

const DateQuestionLayout = ({ onChange, answerBody, disabled }) => {
  const value = answerBody && answerBody.value ? answerBody.value : '';

  return (
    <Box width="100%" padding={15}>
      <Row>
        <ApprovableInput
          disabled={disabled}
          width={200}
          height={50}
          type="date"
          value={Date.parse(value)}
          onCheck={onChange}
          fontSize={15}
          styles={{
            border: !disabled && `3px solid ${themeColors.primary}`,
            mx: 10,
          }}
        />
      </Row>
    </Box>
  );
};

DateQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
};

export default DateQuestionLayout;
